import PublicFooter from '@/components/public-footer';
import PublicHeader from '@/components/public-header';
import { ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <PublicHeader />
            {children}
            <PublicFooter />
        </div>
    );
}
