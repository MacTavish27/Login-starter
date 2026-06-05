# Login Starter Kit

A Laravel + React authentication starter kit with a neon, "technical" login console. It ships with email/password auth and **social login** (Google, GitHub, Facebook) out of the box, plus two-factor authentication, passkeys, email verification, and password reset.

The homepage (`/`) **is** the login screen.

---

## Tech Stack

| Layer    | Tech                                                                                                                                                  |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend  | PHP 8.3, Laravel 13                                                                                                                                   |
| Auth     | [Laravel Fortify](https://laravel.com/docs/fortify) (email/password, 2FA, passkeys) + [Laravel Socialite](https://laravel.com/docs/socialite) (OAuth) |
| Frontend | React 19, [Inertia.js v3](https://inertiajs.com), TypeScript                                                                                          |
| Styling  | Tailwind CSS v4, shadcn-style UI components                                                                                                           |
| Routing  | [Laravel Wayfinder](https://github.com/laravel/wayfinder) (typed routes)                                                                              |
| Tooling  | Vite, Pest (tests), Pint (PHP format), ESLint + Prettier                                                                                              |

---

## Features

- Email + password authentication (Fortify)
- Social login with **Google, GitHub, and Facebook** (Socialite)
- Two-factor authentication (TOTP, QR codes, recovery codes)
- Passkeys / WebAuthn
- Email verification & password reset
- Profile and security settings pages
- Neon "technical" login UI built with React + Tailwind

---

## Requirements

- PHP **8.3+**
- Composer
- Node.js **20+** and npm
- A database (SQLite by default; MySQL/PostgreSQL supported)

---

## Installation

```bash
# 1. Clone and enter the project
git clone <your-repo-url> login-starter
cd login-starter

# 2. Install PHP and JS dependencies, copy env, generate key, migrate, build
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
npm run build
```

> The `composer.json` also defines a `composer run setup` script that runs the steps above in one go.

### Run the app

```bash
composer run dev
```

This starts the PHP server, queue worker, and Vite dev server together. Open **http://localhost:8000**.

---

## Configuring Social Login (OAuth)

Social login is **not preconfigured** — every developer must register their own OAuth apps and add the credentials to `.env`. The keys already exist (empty) in `.env.example`:

```dotenv
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI="${APP_URL}/auth/google/callback"

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REDIRECT_URI="${APP_URL}/auth/github/callback"

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
FACEBOOK_REDIRECT_URI="${APP_URL}/auth/facebook/callback"
```

When registering each app, use these **exact** callback URLs (assuming `APP_URL=http://localhost:8000`):

| Provider     | Where to register                                                                                          | Authorized callback URL                        |
| ------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **GitHub**   | Settings → Developer settings → OAuth Apps → New OAuth App                                                 | `http://localhost:8000/auth/github/callback`   |
| **Google**   | [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → OAuth client ID | `http://localhost:8000/auth/google/callback`   |
| **Facebook** | [developers.facebook.com](https://developers.facebook.com) → Create App → Facebook Login                   | `http://localhost:8000/auth/facebook/callback` |

After adding your keys, clear the config cache:

```bash
php artisan config:clear
```

### Notes & gotchas

- **GitHub is the easiest to test first** — it accepts `http://localhost` callbacks without fuss.
- **Facebook** generally rejects plain `http://localhost`. Keep the app in _Development_ mode and add yourself as a test user, or serve over HTTPS.
- The callback URL in the provider dashboard must match `*_REDIRECT_URI` **exactly** (protocol, host, port, path).
- First social login **auto-creates** the user account (the provider has already verified the email). Existing accounts are linked by matching email address.

---

## How Social Login Works

| Route                           | Purpose                                                     |
| ------------------------------- | ----------------------------------------------------------- |
| `GET /auth/{provider}/redirect` | Sends the user to the provider's consent screen             |
| `GET /auth/{provider}/callback` | Handles the return, finds-or-creates the user, logs them in |

The controller (`app/Http/Controllers/Auth/SocialAuthController.php`) only allows `google`, `github`, and `facebook`; any other provider returns a 404. The find-or-create logic lives in `User::findOrCreateFromSocialite()`.

---

## Testing

```bash
php artisan test
```

Social login is covered by `tests/Feature/Auth/SocialAuthTest.php`, which uses `Socialite::fake()` — so the suite runs without real OAuth credentials.

---

## License

MIT
