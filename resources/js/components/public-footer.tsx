import { Link } from '@inertiajs/react';
import Logo from '/public/images/logo.png';

export default function PublicFooter() {
    return (
        <footer className="mt-20 border-t border-border/50">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Link href="/" className="flex items-center gap-2">
                        <img src={Logo} alt="ShareIdeas" width="150" />
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        Helping creators publish with clarity since 2025
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Link
                            href="/privacy"
                            className="transition-colors hover:text-foreground"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="transition-colors hover:text-foreground"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
