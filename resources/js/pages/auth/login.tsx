import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import SocialLoginButtons from '@/components/social-login-buttons';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            <PasskeyVerify />

            <SocialLoginButtons />

            <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-400/40" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                    or continue with email
                </span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-fuchsia-400/40" />
            </div>

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    className="font-mono text-xs tracking-wider text-slate-300 uppercase"
                                >
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="border-cyan-400/15 bg-white/[0.02] text-white focus-visible:border-cyan-400/70 focus-visible:ring-cyan-400/40"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label
                                        htmlFor="password"
                                        className="font-mono text-xs tracking-wider text-slate-300 uppercase"
                                    >
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm text-cyan-300 hover:text-cyan-200"
                                            tabIndex={5}
                                        >
                                            Forgot your password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="border-cyan-400/15 bg-white/[0.02] focus-visible:border-cyan-400/70 focus-visible:ring-cyan-400/40 text-white"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="data-[state=checked]:border-cyan-400 data-[state=checked]:bg-cyan-500"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-slate-300"
                                >
                                    Remember me
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full border-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white shadow-[0_0_24px_-4px_rgba(34,211,238,0.7)] transition-all hover:from-cyan-400 hover:to-fuchsia-400 hover:shadow-[0_0_30px_-2px_rgba(217,70,239,0.65)]"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Log in
                            </Button>
                        </div>

                        <div className="text-center text-sm text-slate-400">
                            Don't have an account?{' '}
                            <TextLink
                                href={register()}
                                className="text-cyan-300 hover:text-cyan-200"
                                tabIndex={5}
                            >
                                Sign up
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="text-center text-sm font-medium text-cyan-400">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Access Console',
    description: 'Authenticate to continue to your dashboard',
};
