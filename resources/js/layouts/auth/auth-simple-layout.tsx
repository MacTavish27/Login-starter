import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center bg-muted/40 p-4 text-foreground sm:p-8 md:p-10">
            {/* Subtle background ambient gradient */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted/60 via-background to-background" />

            <div className="relative w-full max-w-md">
                <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xl shadow-foreground/5 sm:p-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-3 text-center">
                            <Link
                                href={home()}
                                className="group flex items-center justify-center rounded-xl border border-border/80 bg-background p-2.5 shadow-xs transition-colors hover:bg-muted"
                            >
                                <AppLogoIcon className="size-6 fill-current text-foreground transition-transform group-hover:scale-105" />
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-1">
                                <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                                    {title}
                                </h1>
                                {description && (
                                    <p className="text-sm text-balance text-muted-foreground">
                                        {description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {children}
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    Protected by enterprise-grade security
                </p>
            </div>
        </div>
    );
}
