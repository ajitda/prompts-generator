import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import Logo from '/public/images/logo.png';

export default function PublicHeader() {
    const { url } = usePage();

    const isHome = url === '/';
    const isBlogs = url.startsWith('/blog');

    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <img src={Logo} alt="ShareIdeas" width="150" />
                </Link>
                <nav className="hidden items-center gap-6 text-sm md:flex">
                    <Link
                        href="/"
                        className={`transition-colors hover:text-foreground ${isHome
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
                        href="/blog"
                        className={`transition-colors hover:text-foreground ${isBlogs
                            ? 'font-medium text-foreground'
                            : 'text-muted-foreground'
                            }`}
                    >
                        Blogs
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1 text-muted-foreground outline-hidden transition-colors hover:text-foreground">
                            More Tools <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-56 border-border/50 bg-card backdrop-blur-xl"
                        >
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/youtube"
                                    className="w-full cursor-pointer"
                                >
                                    YouTube Video Idea Generator
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/scripts"
                                    className="w-full cursor-pointer"
                                >
                                    Video Script Generator
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/captions"
                                    className="w-full cursor-pointer"
                                >
                                    TikTok/Instagram Captions
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/prompts"
                                    className="w-full cursor-pointer"
                                >
                                    Prompt Generator
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
