import { NavUser } from '@/components/nav-user';
import postsRoutes from '@/routes/posts';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, MessageSquare, Plus, Video } from 'lucide-react';
import AppLogo from './app-logo';
import { Badge } from './ui/badge';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from './ui/collapsible';
import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip';

// const mainNavItems: NavItem[] = [
// {
//     title: 'Dashboard',
//     href: dashboard(),
//     icon: LayoutGrid,
// },
// ];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    const { props } = usePage<any>();
    const { auth } = props;
    const isPostAdmin = auth.user?.role === 'admin';

    const menu_data = props.menu_data || {};
    const prompts = menu_data.prompts || [];
    const scripts = menu_data.scripts || [];
    const captions = menu_data.captions || [];

    const dynamicGroups = [
        {
            title: 'Youtube Video Idea',
            icon: Video,
            baseHref: '/youtube',
            href: '/youtube',
            items: scripts,
            action: {
                icon: Plus,
                href: '/youtube',
            },
        },
        {
            title: 'Caption Generator',
            icon: MessageSquare,
            baseHref: '/captions',
            href: '/captions',
            items: captions,
            action: {
                icon: Plus,
                href: '/captions',
            },
        },
        {
            title: 'Blog',
            href: '/posts',
            icon: BookOpen,
            action: isPostAdmin
                ? {
                      icon: Plus,
                      href: postsRoutes.index().url,
                  }
                : null,
        },
    ].filter((group) => {
        if (group.title === 'Blog') {
            return isPostAdmin;
        }
        return true;
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {dynamicGroups.map((group) => {
                        const hasItems = group.items?.length > 0;
                        return hasItems ? (
                            <Collapsible
                                key={group.title}
                                asChild
                                defaultOpen={false}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={group.title}
                                        >
                                            <group.icon className="h-4 w-4" />
                                            <span>{group.title}</span>
                                            {/* <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    <TooltipProvider delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <SidebarMenuAction asChild>
                                                    <Link href={group.baseHref}>
                                                        <Badge
                                                            variant="default"
                                                            className="mr-4"
                                                        >
                                                            New
                                                        </Badge>
                                                    </Link>
                                                </SidebarMenuAction>
                                            </TooltipTrigger>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {group.items.map((item: any) => (
                                                <SidebarMenuSubItem
                                                    key={item.id}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`${group.baseHref}/${item.id}`}
                                                        >
                                                            <span>
                                                                {item.keyword}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ) : (
                            <SidebarMenuItem key={group.title}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={group.title}
                                >
                                    <Link href={group.href || '#'}>
                                        <group.icon className="h-4 w-4" />
                                        <span>{group.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                                {group.action && (
                                    <SidebarMenuAction asChild>
                                        <Link href={group.action.href}>
                                            <Badge
                                                variant="default"
                                                className="mr-4"
                                            >
                                                New
                                            </Badge>
                                        </Link>
                                    </SidebarMenuAction>
                                )}
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
