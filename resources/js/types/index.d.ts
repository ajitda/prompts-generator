import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
    session_data?: {
        savedKeyword: string;
        savedAudience: string;
        savedDuration: string;
        savedPrompt: string;
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Prompt {
    id: number;
    user_id: number;
    type: 'image' | 'text' | 'video';
    keyword: string;
    prompt: string;
    created_at: string;
    updated_at: string;
}

export interface PromptIndexProps {
    prompts?: {
        data: Prompt[];
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    } | null;
    isAuthenticated: boolean;
}

export interface WelcomeProps {
    canRegister?: boolean;
    prompts?: { data: Prompt[] } | null;
    isAuthenticated?: boolean;
};

type SortDirection = 'asc' | 'desc';
type SortField = 'name' | 'description' | 'price' | 'created_at' | 'tag';

export interface SortProps {
    field: SortField;
    direction: SortDirection;
}
