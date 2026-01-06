import { NavUser } from '@/components/nav-user';
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
import { dashboard } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, LayoutGrid, Plus, Video } from 'lucide-react';
import AppLogo from './app-logo';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from './ui/collapsible';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';

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

    const { menu_data = { prompts: [], scripts: [] } } = props;

    const dynamicGroups = [
        // {
        //     title: 'AI Prompts',
        //     icon: LayoutGrid,
        //     baseHref: '/ai-video-generator/prompts',
        //     items: props?.prompts?.data,
        //     // items: menu_data.prompts,
        // },
        {
            title: 'AI Video Idea',
            icon: Video,
            baseHref: '/ai-video-generator/scripts',
            items: props?.scripts?.data,
            // items: menu_data.scripts,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
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

                        return (
                            <Collapsible
                                key={group.title}
                                asChild
                                defaultOpen={false}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    {/* 1. Main Toggle: Clicking the Text toggles the menu */}
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={group.title}
                                        >
                                            <group.icon className="w-4 h-4" />
                                            <span>{group.title}</span>
                                            {hasItems && (
                                                <ChevronRight className="ml-auto w-4 h-4 group-data-[state=open]/collapsible:rotate-90 transition-transform duration-200" />
                                            )}
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    {/* 2. Add Button: Clicking the Plus navigates to the URL */}
                                    <TooltipProvider delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <SidebarMenuAction
                                                    asChild
                                                    className={
                                                        hasItems
                                                            ? 'right-8'
                                                            : 'right-2'
                                                    }
                                                >
                                                    <Link href={group.baseHref}>
                                                        <Plus className="mr-16 w-4 h-4" />
                                                    </Link>
                                                </SidebarMenuAction>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">
                                                Add New
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    {/* 3. Sub-Items */}
                                    {hasItems && (
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {group.items.map(
                                                    (item: any) => (
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
                                                                        {
                                                                            item.keyword
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ),
                                                )}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    )}
                                </SidebarMenuItem>
                            </Collapsible>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
