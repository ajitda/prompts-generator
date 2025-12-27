import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    
    const { auth } = usePage<SharedData>().props;
    
    return (
        <AppShell variant="sidebar">
            {auth?.user &&
                <AppSidebar />
            }
            <AppContent variant="sidebar" className="overflow-x-hidden">
                {auth?.user &&
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                }
                {children}
            </AppContent>
        </AppShell>
    );
}
