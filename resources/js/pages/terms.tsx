import Meta from '@/components/meta';
import PublicLayout from '@/layouts/public-layout';
import {
    AlertTriangle,
    Clock,
    CreditCard,
    FileText,
    Globe,
    Scale,
    UserCheck,
} from 'lucide-react';

export default function Terms() {
    return (
        <PublicLayout>
            <Meta
                title="Terms of Service | AI YouTube Video Idea Generator"
                description="Read our terms of service to understand the rules and regulations for using our platform."
            />
            <main className="relative container mx-auto px-4 py-16 md:py-24">
                {/* Decorative Background Glows */}
                <div className="absolute top-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
                <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

                <div className="animate-reveal mx-auto max-w-4xl">
                    <div className="mb-12 flex flex-col items-center text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase">
                            <Clock className="h-3.5 w-3.5" />
                            Effective Date: January 2026
                        </div>
                        <h1 className="mb-4 text-4xl font-black tracking-tight text-foreground md:text-6xl">
                            Terms of{' '}
                            <span className="text-gradient">Service</span>
                        </h1>
                        <p className="max-w-xl text-lg text-muted-foreground">
                            Welcome to the future of content strategy. By using
                            our platform, you agree to these terms designed to
                            ensure a fair and powerful experience for all
                            creators.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <div className="rounded-[2.5rem] border border-border/40 bg-card/40 p-8 shadow-2xl shadow-primary/5 backdrop-blur-xl md:p-12">
                            <div className="space-y-12">
                                <section className="group">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                                            <Scale className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            1. Acceptance of Terms
                                        </h2>
                                    </div>
                                    <div className="ml-16 text-lg leading-relaxed text-muted-foreground">
                                        <p>
                                            By accessing or using our platform,
                                            you agree to be bound by these Terms
                                            of Service and all applicable laws
                                            and regulations. If you do not agree
                                            with any of these terms, you are
                                            prohibited from using or accessing
                                            this site.
                                        </p>
                                    </div>
                                </section>

                                <section className="group">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 transition-transform group-hover:scale-110">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            2. Use License
                                        </h2>
                                    </div>
                                    <div className="ml-16 text-lg leading-relaxed text-muted-foreground">
                                        <p>
                                            Permission is granted to temporarily
                                            use our AI generation tools for
                                            personal or commercial video
                                            creation. This is the grant of a
                                            license, not a transfer of title,
                                            and under this license you may not:
                                        </p>
                                        <ul className="mt-4 list-inside list-disc space-y-2 decoration-indigo-500/30">
                                            <li>
                                                Modify or copy the underlying AI
                                                models
                                            </li>
                                            <li>
                                                Use the materials for any
                                                commercial reverse-engineering
                                            </li>
                                            <li>
                                                Attempt to decompile any
                                                software contained on the
                                                website
                                            </li>
                                        </ul>
                                    </div>
                                </section>

                                <section className="group">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500 transition-transform group-hover:scale-110">
                                            <UserCheck className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            3. User Responsibility
                                        </h2>
                                    </div>
                                    <div className="ml-16 text-lg leading-relaxed text-muted-foreground">
                                        <p>
                                            You are responsible for the content
                                            you generate and must ensure it
                                            complies with YouTube's community
                                            guidelines and other platform
                                            regulations. We provide the
                                            strategic spark; the final oversight
                                            is yours.
                                        </p>
                                    </div>
                                </section>

                                <section className="group">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 transition-transform group-hover:scale-110">
                                            <CreditCard className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            4. Subscription and Payments
                                        </h2>
                                    </div>
                                    <div className="ml-16 text-lg leading-relaxed text-muted-foreground">
                                        <p>
                                            Some features require a paid
                                            subscription or credits. All
                                            payments are non-refundable unless
                                            required by law. We reserve the
                                            right to change our pricing at any
                                            time with appropriate notice.
                                        </p>
                                    </div>
                                </section>

                                <section className="group">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 transition-transform group-hover:scale-110">
                                            <AlertTriangle className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            5. Limitation of Liability
                                        </h2>
                                    </div>
                                    <div className="ml-16 text-lg leading-relaxed text-muted-foreground">
                                        <p>
                                            We shall not be held liable for any
                                            damages arising out of the use or
                                            inability to use our services. Our
                                            AI provides suggestions based on
                                            patterns, and results may vary by
                                            niche and execution.
                                        </p>
                                    </div>
                                </section>

                                <section className="group">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 transition-transform group-hover:scale-110">
                                            <Globe className="h-6 w-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            6. Governing Law
                                        </h2>
                                    </div>
                                    <div className="ml-16 text-lg leading-relaxed text-muted-foreground">
                                        <p>
                                            These terms are governed by and
                                            construed in accordance with the
                                            laws of your primary jurisdiction,
                                            without regard to its conflict of
                                            law provisions.
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
