import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import Logo from '/public/images/logo.png';

export default function PublicHeader() {
    const { url } = usePage();

    const isHome = url === '/';
    const isBlogs = url.startsWith('/blogs');

    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <img src={Logo} alt="" width="150" />
                </Link>
                <nav className="hidden items-center gap-6 text-sm md:flex">
                    <Link
                        href="/"
                        className={`transition-colors hover:text-foreground ${
                            isHome
                                ? 'font-medium text-foreground'
                                : 'text-muted-foreground'
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/#features"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Features
                    </Link>
                    <Link
                        href="/#how-it-works"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        How it works
                    </Link>
                    <Link
                        href="/blogs"
                        className={`transition-colors hover:text-foreground ${
                            isBlogs
                                ? 'font-medium text-foreground'
                                : 'text-muted-foreground'
                        }`}
                    >
                        Blogs
                    </Link>
                </nav>
                <Link href="/youtube">
                    <Button variant="default" size="sm">
                        Get Started
                    </Button>
                </Link>
            </div>
        </header>
    );
}
