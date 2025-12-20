import {
    // generatePrompt as promptsCreate,
    // destroy as productsDestroy,
    // edit as productsEdit,
    index as promptsIndex,
    // show as promptsShow
} from '@/actions/App/Http/Controllers/PromptController';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { ExportImportButtons } from '@/components/ui/export-import-buttons';
// import { ImportPreviewModal } from '@/components/ui/import-preview-modal';
import { Input } from '@/components/ui/input';
// import { Pagination } from '@/components/ui/pagination';
// import { PriceFilter } from '@/components/ui/price-filter';
import { SortableHeader } from '@/components/ui/sortable-header';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SortField, SortProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Eye, MoreHorizontal, Pencil, Trash, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Prompts',
        href: promptsIndex().url,
    },
];

export default function Index() {
    const { props } = usePage<any>();
    // console.log('📦 FULL Inertia Response:', {
    //     props: JSON.parse(JSON.stringify(props)),
    //     keys: Object.keys(props),
    //     hasCurrentPerPage: 'currentPerPage' in props,
    //     currentPerPageValue: props.currentPerPage,
    //     filtersValue: props.filters,
    //     productsPerPage: props.products?.per_page
    // });

    const { prompts, filters = {}, perPageOptions } = props;

    // const currentPerPage = prompts?.per_page || 2;
    
    // const [localSearch, setLocalSearch] = useState(filters.search || '');
    // const [localMinPrice, setLocalMinPrice] = useState(filters.min_price || '');
    // const [localMaxPrice, setLocalMaxPrice] = useState(filters.max_price || '');

    const [sortConfig, setSortConfig] = useState<SortProps>({
        field: filters?.sort as SortField,
        direction: filters?.direction as SortProps['direction'],
    });

    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const fetchData = useCallback((        
        overrideParams: Partial<{
            // search: string;
            // min_price: string;
            // max_price: string;
            sort: SortField;
            direction: 'asc' | 'desc';
            // per_page: number;
        }> = {}
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
            if (params[key] !== '' && params[key] !== undefined && params[key] !== null) {
                // @ts-ignore
                queryParams[key] = params[key];
            }
        });

        router.get(promptsIndex().url, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }, [sortConfig]);

    const [importErrors, setImportErrors] = useState<any[]>([]);
    const [showImportPreview, setShowImportPreview] = useState(false);
    
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
            fetchData();
        }
    };

    const handleResetFilters = () => {
        // setLocalSearch('');
        // setLocalMinPrice('');
        // setLocalMaxPrice('');
        setSortConfig({ field: 'created_at', direction: 'desc' });

        router.get(promptsIndex().url, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        };
    }, []);

    // console.log('📦 Products:', products);
    // useEffect(() => {
    //     console.log('📊 Current props:', {
    //         currentPerPage,
    //         type: typeof currentPerPage,
    //         filters,
    //         productsPerPage: products?.per_page
    //     });
    // }, [currentPerPage, filters, products]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-lg-xl p-4">

                {/* Filters Toolbar */}
                <div className='mb-4 flex w-full flex-wrap items-center gap-4'>
                    {/* <Input
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        value={localSearch}
                        type='text'
                        placeholder='Search Product ...'
                        name='search'
                        className='w-full md:w-1/3' 
                    /> */}
                    {/* <PriceFilter
                        min_price={localMinPrice}
                        max_price={localMaxPrice}
                        onPriceChange={handlePriceChange}
                    /> */}

                    {/* {(localSearch || localMinPrice || localMaxPrice) && (
                        <Button
                            variant="destructive"
                            className='cursor-pointer'
                            onClick={handleResetFilters}
                        >
                            <X size={16} className='mr-2' /> Reset
                        </Button>
                    )} */}

                    <div className='ml-auto'>
                        <Link
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
                            href='/'
                            // href={promptsCreate().url}
                        >
                            Add Prompt
                        </Link>
                    </div>
                </div>

                <div className='ml-auto flex items-center gap-2'>
                    {/* <ExportImportButtons filters={filters} /> */}
                </div>

                {/* Table */}
                <div className="rounded-md border">
                    <table className='w-full table-auto'>
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr className='text-left text-sm font-medium text-gray-500 dark:text-gray-300'>
                                <th className='p-4 border-b'>#</th>
                                <SortableHeader field="type" currentSort={sortConfig} onSort={handleSort} className='p-4 border-b'>Type</SortableHeader>
                                <SortableHeader field="keyword" currentSort={sortConfig} onSort={handleSort} className='p-4 border-b'>Keyword</SortableHeader>
                                <SortableHeader field="prompt" currentSort={sortConfig} onSort={handleSort} className='p-4 border-b'>Prompt</SortableHeader>
                                <SortableHeader field="created_at" currentSort={sortConfig} onSort={handleSort} className='p-4 border-b'>Created Date</SortableHeader>
                                <th className='p-4 border-b text-right'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {prompts?.data?.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">
                                        No prompts found.
                                    </td>
                                </tr>
                            ) : (
                                prompts?.data?.map((prompt, index) => (
                                    <tr key={prompt.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                        <td className='border-b px-4 py-2'>{index + 1}</td>
                                        <td className='border-b px-4 py-2 font-medium'>{prompt.type}</td>
                                        <td className='border-b px-4 py-2 text-gray-500 truncate max-w-xs'>{prompt.keyword}</td>
                                        <td className='border-b px-4 py-2'>${prompt.prompt}</td>
                                        <td className='border-b px-4 py-2 text-sm'>{prompt.created_at}</td>

                                        <td className='border-b px-4 py-2 text-right'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="cursor-pointer h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    {/* <DropdownMenuItem asChild>
                                                        <Link href={promptsShow(prompt.id).url} className="w-full flex items-center cursor-pointer">
                                                            <Eye className="mr-2 h-4 w-4" /> View Details
                                                        </Link>
                                                    </DropdownMenuItem> */}
                                                    {/* <DropdownMenuItem asChild>
                                                        <Link href={productsEdit(product.id).url} className="w-full flex items-center cursor-pointer">
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                                        </Link>
                                                    </DropdownMenuItem> */}
                                                    {/* <DropdownMenuItem
                                                        className="text-red-600 focus:text-red-600 cursor-pointer"
                                                        onClick={() => {
                                                            if (confirm('Are you sure you want to delete this product?')) {
                                                                router.delete(productsDestroy(product.id).url, {
                                                                    preserveScroll: true,
                                                                });
                                                            }
                                                        }}
                                                    > */}
                                                        <Trash className="mr-2 h-4 w-4" /> Delete
                                                    {/* </DropdownMenuItem> */}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* <Pagination products={products} perPageOptions={perPageOptions} /> */}

                {/* <ImportPreviewModal
                    isOpen={showImportPreview}
                    onClose={() => setShowImportPreview(false)}
                    errors={importErrors}
                /> */}
            </div>
        </AppLayout>
    );
}
