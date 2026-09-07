<?php

use App\Models\User;
use Laravel\Socialite\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

function fakeSocialiteUser(array $attributes = []): SocialiteUser
{
    return (new SocialiteUser)->map(array_merge([
        'id' => 'github-123',
        'name' => 'Jason Beggs',
        'nickname' => 'jbeggs',
        'email' => 'jason@example.com',
        'avatar' => 'https://example.com/avatar.png',
    ], $attributes));
}

test('user is redirected to the provider', function () {
    Socialite::fake('github');

    $this->get('/auth/github/redirect')->assertRedirect();
});

test('an unsupported provider returns 404', function () {
    $this->get('/auth/twitter/redirect')->assertNotFound();
    $this->get('/auth/twitter/callback')->assertNotFound();
});

test('a new user is created and logged in from the callback', function () {
    Socialite::fake('github', fakeSocialiteUser());

    $response = $this->get('/auth/github/callback');

    $response->assertRedirect(route('dashboard', absolute: false));
    $this->assertAuthenticated();

    $this->assertDatabaseHas('users', [
        'email' => 'jason@example.com',
        'name' => 'Jason Beggs',
        'provider' => 'github',
        'provider_id' => 'github-123',
        'avatar' => 'https://example.com/avatar.png',
    ]);

    expect(User::firstWhere('email', 'jason@example.com'))
        ->email_verified_at->not->toBeNull();
});

test('an existing account is linked by email instead of duplicated', function () {
    $existing = User::factory()->create([
        'email' => 'jason@example.com',
        'provider' => null,
        'provider_id' => null,
    ]);

    Socialite::fake('github', fakeSocialiteUser());

    $this->get('/auth/github/callback')->assertRedirect(route('dashboard', absolute: false));

    $this->assertAuthenticatedAs($existing->fresh());
    expect(User::where('email', 'jason@example.com')->count())->toBe(1);
    expect($existing->fresh())
        ->provider->toBe('github')
        ->provider_id->toBe('github-123');
});

test('callback fails gracefully when no email is returned by provider', function () {
    Socialite::fake('github', fakeSocialiteUser([
        'email' => null,
    ]));

    $response = $this->get('/auth/github/callback');

    $response->assertRedirect(route('login'));
    $response->assertSessionHasErrors('email');
    $this->assertGuest();
});

test('existing user logs in via existing provider and provider id', function () {
    $user = User::factory()->create([
        'email' => 'jason@example.com',
        'provider' => 'github',
        'provider_id' => 'github-123',
    ]);

    Socialite::fake('github', fakeSocialiteUser([
        'id' => 'github-123',
        'email' => 'jason-new@example.com',
    ]));

    $response = $this->get('/auth/github/callback');

    $response->assertRedirect(route('dashboard', absolute: false));
    $this->assertAuthenticatedAs($user->fresh());
});
