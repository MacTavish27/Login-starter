import { Button } from '@/components/ui/button';
import { redirect } from '@/routes/social';

type Provider = {
    name: string;
    label: string;
    icon: React.ReactNode;
};

const providers: Provider[] = [
    {
        name: 'google',
        label: 'Google',
        icon: (
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
                />
                <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
                />
                <path
                    fill="#FBBC05"
                    d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
                />
                <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
                />
            </svg>
        ),
    },
    {
        name: 'github',
        label: 'GitHub',
        icon: (
            <svg
                viewBox="0 0 24 24"
                className="size-4 fill-current"
                aria-hidden="true"
            >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
            </svg>
        ),
    },
    {
        name: 'facebook',
        label: 'Facebook',
        icon: (
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                <path
                    fill="#1877F2"
                    d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
                />
            </svg>
        ),
    },
];

export default function SocialLoginButtons() {
    return (
        <div className="grid gap-2.5">
            {providers.map((provider) => (
                <Button
                    key={provider.name}
                    variant="outline"
                    type="button"
                    asChild
                    className="h-10 w-full justify-center gap-2.5 border-border/80 bg-background font-medium text-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    <a href={redirect(provider.name).url}>
                        {provider.icon}
                        Continue with {provider.label}
                    </a>
                </Button>
            ))}
        </div>
    );
}
