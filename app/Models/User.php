<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Socialite\Contracts\User as SocialiteUser;

#[Fillable(['name', 'email', 'password', 'provider', 'provider_id', 'avatar'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    /**
     * Find an existing user for the given OAuth identity, or create one.
     *
     * Existing accounts are matched by email so that a user who first signed
     * up with a password can later link a social provider to the same account.
     */
    public static function findOrCreateFromSocialite(string $provider, SocialiteUser $socialiteUser): self
    {
        $user = static::query()
            ->where('email', $socialiteUser->getEmail())
            ->first();

        if ($user) {
            $user->fill([
                'provider' => $provider,
                'provider_id' => $socialiteUser->getId(),
                'avatar' => $socialiteUser->getAvatar(),
            ])->save();

            return $user;
        }

        $user = static::create([
            'name' => $socialiteUser->getName() ?? $socialiteUser->getNickname() ?? 'User',
            'email' => $socialiteUser->getEmail(),
            'provider' => $provider,
            'provider_id' => $socialiteUser->getId(),
            'avatar' => $socialiteUser->getAvatar(),
        ]);

        // The provider already verified this email address, so trust it.
        $user->forceFill(['email_verified_at' => now()])->save();

        return $user;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }
}
