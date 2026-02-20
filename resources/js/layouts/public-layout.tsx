import PublicFooter from '@/components/public-footer';
import PublicHeader from '@/components/public-header';
import Seo from '@/components/seo';
import { ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Seo
                title="Prompts Generator"
                description="Generate creative prompts for your projects."
            />
            <PublicHeader />
            {children}
            <PublicFooter />
        </div>
    );
}
