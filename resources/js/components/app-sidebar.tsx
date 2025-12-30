import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, ChevronRight, Folder, LayoutGrid, Video } from 'lucide-react';
import AppLogo from './app-logo';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const mainNavItems: NavItem[] = [
    // {
    //     title: 'Dashboard',
    //     href: dashboard(),
    //     icon: LayoutGrid,
    // },
];

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

    const { prompts, scripts } = props;
    
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
                    <Collapsible asChild defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="AI Prompts" asChild>
                                <div>
                                    <Link href="/prompts-generator/prompts" className="flex flex-1 items-center gap-2">
                                        <LayoutGrid />
                                        <span>AI Prompts</span>
                                    </Link>
                                    <CollapsibleTrigger>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </CollapsibleTrigger>
                                </div>
                            </SidebarMenuButton>

                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {Array.isArray(prompts) && prompts.map((prompt: any) => (
                                        <SidebarMenuSubItem key={prompt.id}>
                                            <SidebarMenuSubButton asChild>
                                                <Link href={`/prompts-generator/prompts/${prompt.id}`}>
                                                    <span>{prompt.keyword}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>

                    {/* AI Video Scripts Section */}
                    <Collapsible asChild defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="AI Video Scripts" asChild>
                                <div>
                                    <Link href="/prompts-generator/scripts" className="flex flex-1 items-center gap-2">
                                        <Video />
                                        <span>AI Video Scripts</span>
                                    </Link>
                                    <CollapsibleTrigger>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </CollapsibleTrigger>
                                </div>
                            </SidebarMenuButton>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {Array.isArray(scripts) && scripts.map((script: any) => (
                                        <SidebarMenuSubItem key={script.id}>
                                            <SidebarMenuSubButton asChild>
                                                <Link href={`/prompts-generator/scripts/${script.id}`}>
                                                    <span>{script.keyword}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
