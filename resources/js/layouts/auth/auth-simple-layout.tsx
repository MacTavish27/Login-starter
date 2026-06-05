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
        <div className="dark relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#04060d] p-6 text-foreground md:p-10">
            {/* Technical grid */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.08)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)] bg-[size:38px_38px]" />

            {/* Neon glows */}
            <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
            <div className="pointer-events-none absolute right-[-6rem] bottom-[-10rem] h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[120px]" />

            <div className="relative w-full max-w-sm">
                <div className="rounded-2xl border border-cyan-400/20 bg-white/[0.03] p-8 shadow-[0_0_50px_-12px_rgba(34,211,238,0.45)] backdrop-blur-xl">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link
                                href={home()}
                                className="flex flex-col items-center gap-2 font-medium"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/5 shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]">
                                    <AppLogoIcon className="size-7 fill-current text-cyan-300" />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="bg-gradient-to-r from-cyan-300 via-sky-200 to-fuchsia-300 bg-clip-text font-mono text-xl font-semibold tracking-tight text-transparent">
                                    {title}
                                </h1>
                                <p className="text-center text-sm text-slate-400">
                                    {description}
                                </p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>

                <p className="mt-5 text-center font-mono text-[10px] tracking-[0.3em] text-slate-600 uppercase">
                    {'// secure access terminal'}
                </p>
            </div>
        </div>
    );
}
