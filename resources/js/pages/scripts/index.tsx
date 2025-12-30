import {
    // generatePrompt as promptsCreate,
    // destroy as productsDestroy,
    // edit as productsEdit,
    index as scriptsIndex,
    show as promptsShow
} from '@/actions/App/Http/Controllers/ScriptController';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import ScriptForm from './script-form';
import { BreadcrumbItem, SortField, SortProps } from '@/types';
import { useCallback, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'AI Video Scripts',
        href: scriptsIndex().url,
    },
];

export default function VideoScripts() {
  
  const { props } = usePage<any>();
  
      const { scripts, filters = {}, perPageOptions } = props;
  
      // const currentPerPage = prompts?.per_page || 2;
      
      // const [localSearch, setLocalSearch] = useState(filters.search || '');
      // const [localMinPrice, setLocalMinPrice] = useState(filters.min_price || '');
      // const [localMaxPrice, setLocalMaxPrice] = useState(filters.max_price || '');
  
      const [sortConfig, setSortConfig] = useState<SortProps>({
          field: filters?.sort as SortField,
          direction: filters?.direction as SortProps['direction'],
      });
  
      // const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
  
          router.get(scriptsIndex().url, {
              preserveScroll: true,
              preserveState: true,
              replace: true,
          });
      }, [sortConfig]);
  
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

      <div className="max-w-4xl mx-auto p-2">

        <ScriptForm />
      </div>
    </AppLayout>
  );
}
