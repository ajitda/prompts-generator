import Meta from '@/components/meta';
import PublicLayout from '@/layouts/public-layout';
import {
    Clock,
    Cookie,
    Cpu,
    Lock,
    Mail,
    ShieldCheck,
    UserCheck,
} from 'lucide-react';

export default function Privacy() {
    return (
        <PublicLayout>
            <Meta
                title="Privacy Policy | AI YouTube Video Idea Generator"
                description="Our privacy policy explains how we collect, use, and protect your information."
            />
            <main className="relative container mx-auto px-4 py-16 md:py-24">
                {/* Decorative Background Glows */}
                <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[100px]" />

                <div className="animate-reveal mx-auto max-w-4xl">
                    <div className="mb-12 flex flex-col items-center text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase">
                            <Clock className="h-3.5 w-3.5" />
                            Last Updated: January 2026
                        </div>
                        <h1 className="mb-4 text-4xl font-black tracking-tight text-foreground md:text-6xl">
                            Privacy{' '}
                            <span className="text-gradient">Policy</span>
                        </h1>
                        <p className="max-w-xl text-lg text-muted-foreground">
                            We value your privacy and are committed to
                            protecting your personal data. Transparency is at
                            the heart of our AI-powered strategic services.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <div className="rounded-[2.5rem] border border-border/40 bg-card/40 p-8 shadow-2xl shadow-primary/5 backdrop-blur-xl md:p-12">
                            <div className="space-y-12">
                                <section className="group">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                                            <ShieldCheck className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            1. Information We Collect
                                        </h2>
                                    </div>
                                    <div className="ml-16 space-y-4 text-lg leading-relaxed text-muted-foreground">
                                        <p>
                                            We collect information you provide
                                            directly to us when you create an
                                            account, use our AI generation
                                            tools, or communicate with us.
                                        </p>
                                        <ul className="list-inside list-disc space-y-2 decoration-primary/30">
                                            <li>
                                                Account details (Name, Email,
                                                Password)
                                            </li>
                                            <li>
                                                Niche and content preferences
                                            </li>
                                            <li>
                                                Billing and payment processing
                                                info
                                            </li>
                                        </ul>
                                    </div>
                                </section>

                                <section className="group">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 transition-transform group-hover:scale-110">
                                            <UserCheck className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            2. How We Use Your Information
                                        </h2>
                                    </div>
                                    <div className="ml-16 text-lg leading-relaxed text-muted-foreground">
                                        <p>
                                            We use the information we collect to
                                            provide, maintain, and improve our
                                            services, to process your
                                            transactions, and to communicate
                                            with you about your account. Our
                                            primary goal is to provide
                                            data-driven strategic insights for
                                            your YouTube channel.
                                        </p>
                                    </div>
                                </section>

                                <section className="group">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500 transition-transform group-hover:scale-110">
                                            <Cpu className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            3. AI Training and Data
                                        </h2>
                                    </div>
                                    <div className="ml-16 text-lg leading-relaxed text-muted-foreground">
                                        <p>
                                            The content you generate using our
                                            AI tools is used to provide you with
                                            the requested service. We prioritize
                                            data isolation and do not sell your
                                            personal strategy data to third
                                            parties.
                                        </p>
                                    </div>
                                </section>

                                <section className="group">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 transition-transform group-hover:scale-110">
                                            <Cookie className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            4. Cookies
                                        </h2>
                                    </div>
                                    <div className="ml-16 text-lg leading-relaxed text-muted-foreground">
                                        <p>
                                            We use cookies and similar tracking
                                            technologies to track the activity
                                            on our service and hold certain
                                            information to improve your
                                            experience and remember your
                                            preferences between sessions.
                                        </p>
                                    </div>
                                </section>

                                <section className="group">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 transition-transform group-hover:scale-110">
                                            <Lock className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            5. Security
                                        </h2>
                                    </div>
                                    <div className="ml-16 text-lg leading-relaxed text-muted-foreground">
                                        <p>
                                            We implement industry-standard
                                            technical and organizational
                                            measures to protect the security of
                                            your personal information, including
                                            end-to-end encryption for sensitive
                                            data.
                                        </p>
                                    </div>
                                </section>

                                <section className="group">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 transition-transform group-hover:scale-110">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            6. Contact Us
                                        </h2>
                                    </div>
                                    <div className="ml-16 text-lg leading-relaxed text-muted-foreground">
                                        <p>
                                            If you have any questions about this
                                            Privacy Policy, please reach out to
                                            our dedicated privacy team at{' '}
                                            <span className="font-bold text-foreground">
                                                privacy@shareideas.info
                                            </span>
                                            .
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
