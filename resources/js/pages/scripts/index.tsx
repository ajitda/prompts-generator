import {
    // generatePrompt as promptsCreate,
    // destroy as productsDestroy,
    // edit as productsEdit,
    index as scriptsIndex,
} from '@/actions/App/Http/Controllers/ScriptController';
import IdeaGenerator from '@/components/IdeaGenerator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SortField, SortProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Sparkles, Zap } from 'lucide-react';
import { useCallback, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Youtube Video Idea Generator',
        href: scriptsIndex().url,
    },
];

export default function VideoScripts() {
    const { props } = usePage<any>();

    const {
        scripts,
        filters = {},
        perPageOptions,
        initialGuestCredits,
        isAuthenticated,
        userCredits,
    } = props;

    // const currentPerPage = prompts?.per_page || 2;

    // const [localSearch, setLocalSearch] = useState(filters.search || '');
    // const [localMinPrice, setLocalMinPrice] = useState(filters.min_price || '');
    // const [localMaxPrice, setLocalMaxPrice] = useState(filters.max_price || '');

    const [sortConfig, setSortConfig] = useState<SortProps>({
        field: filters?.sort as SortField,
        direction: filters?.direction as SortProps['direction'],
    });

    // const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const fetchData = useCallback(
        (
            overrideParams: Partial<{
                // search: string;
                // min_price: string;
                // max_price: string;
                sort: SortField;
                direction: 'asc' | 'desc';
                // per_page: number;
            }> = {},
        ) => {
            const params = {
                // search: localSearch,
                // min_price: localMinPrice,
                // max_price: localMaxPrice,
                sort: sortConfig.field,
                direction: sortConfig.direction,
                // per_page: products?.per_page || 2,
                ...overrideParams,
            };

            const queryParams: Record<string, any> = {};
            Object.keys(params).forEach((key) => {
                // @ts-ignore
                if (
                    params[key] !== '' &&
                    params[key] !== undefined &&
                    params[key] !== null
                ) {
                    // @ts-ignore
                    queryParams[key] = params[key];
                }
            });

            router.get(scriptsIndex().url, {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            });
        },
        [sortConfig],
    );

    // const [importErrors, setImportErrors] = useState<any[]>([]);
    // const [showImportPreview, setShowImportPreview] = useState(false);

    // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
    //     setLocalSearch(value);

    //     if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    //     searchTimeoutRef.current = setTimeout(() => {
    //         fetchData({ search: value });
    //     }, 500);
    // };

    // const handlePriceChange = (min: string, max: string) => {
    //     setLocalMinPrice(min);
    //     setLocalMaxPrice(max);
    //     fetchData({ min_price: min, max_price: max });
    // };

    const handleSort = (field: SortField) => {
        let newDirection: SortProps['direction'] = 'asc';
        if (sortConfig.field === field) {
            newDirection = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        }

        const newSort = { field, direction: newDirection };
        setSortConfig(newSort);

        fetchData({ sort: field, direction: newDirection });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>AI Video Scripts Generator</title>
                <meta
                    name="description"
                    content="Generate professional YouTube video scripts using AI. Keyword to script in minutes."
                />
            </Head>
            <div className="min-h-screen bg-background">
                <main className="container mx-auto px-4 py-12 md:py-20">
                    <div className="mb-12 space-y-6 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            <Sparkles className="h-4 w-4" />
                            <span>AI-Powered YouTube Strategy</span>
                        </div>

                        <h1 className="text-4xl leading-tight font-extrabold md:text-5xl lg:text-6xl">
                            Turn Any Niche Into{' '}
                            <span className="text-gradient">
                                Viral YouTube Ideas
                            </span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                            Beat creator's block in seconds. Get strategic,
                            high-CTR video ideas tailored to your niche—complete
                            with titles, thumbnail concepts, and hook scripts.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-primary" />
                                <span>5 Ideas per Generation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-primary" />
                                <span>Copy-Ready Scripts</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-primary" />
                                <span>Free to Use</span>
                            </div>
                        </div>
                    </div>
                    <IdeaGenerator
                        initialGuestCredits={initialGuestCredits}
                        isAuthenticated={isAuthenticated}
                        userCredits={userCredits}
                    />
                </main>
            </div>
        </AppLayout>
    );
}
