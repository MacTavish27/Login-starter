<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;

class SocialAuthController extends Controller
{
    /**
     * The OAuth providers this application allows.
     *
     * @var list<string>
     */
    private const PROVIDERS = ['google', 'github', 'facebook'];

    /**
     * Redirect the user to the provider's OAuth consent screen.
     */
    public function redirect(string $provider): SymfonyRedirectResponse
    {
        $this->ensureProviderIsSupported($provider);

        return Socialite::driver($provider)->redirect();
    }

    /**
     * Handle the callback from the provider and log the user in.
     */
    public function callback(string $provider): RedirectResponse
    {
        $this->ensureProviderIsSupported($provider);

        try {
            $socialiteUser = Socialite::driver($provider)->user();
        } catch (\Throwable $e) {
            // The user denied access, or the OAuth handshake failed.
            return redirect()->route('login')->withErrors([
                'email' => 'Unable to sign in with '.ucfirst($provider).'. Please try again.',
            ]);
        }

        $user = User::findOrCreateFromSocialite($provider, $socialiteUser);

        Auth::login($user, remember: true);

        return redirect()->intended(route('dashboard'));
    }

    /**
     * Abort with a 404 when an unknown provider is requested.
     */
    private function ensureProviderIsSupported(string $provider): void
    {
        abort_unless(in_array($provider, self::PROVIDERS, true), 404);
    }
}
