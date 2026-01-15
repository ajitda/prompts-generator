import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import postsRoutes from '@/routes/posts';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import { ArrowLeft, Calendar, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Blog Management',
        href: postsRoutes.index().url,
    },
    {
        title: 'Compose Article',
        href: postsRoutes.create().url,
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        status: 'draft',
        scheduled_at: '',
        image: null as File | null,
        meta_title: '',
        meta_description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(postsRoutes.store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Compose New Article" />
            <div className="animate-reveal space-y-8 pb-20">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-foreground md:text-3xl">
                            Compose New Article
                        </h1>
                        <p className="mt-1 font-medium text-muted-foreground">
                            Draft a new blog post for your audience.
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-[32px] border border-border/40 bg-card/50 p-8 shadow-elegant backdrop-blur-sm">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="group space-y-2">
                            <Label
                                htmlFor="title"
                                className="px-1 text-xs font-black tracking-widest text-muted-foreground uppercase"
                            >
                                Title
                            </Label>
                            <Input
                                id="title"
                                placeholder="Enter a catchy title..."
                                className="h-14 rounded-xl border-border/40 bg-muted/20 text-lg font-bold focus:ring-primary/20"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                            />
                            {errors.title && (
                                <p className="px-1 text-xs font-bold text-destructive">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="content"
                                className="px-1 text-xs font-black tracking-widest text-muted-foreground uppercase"
                            >
                                Content
                            </Label>
                            <div className="overflow-hidden rounded-xl border border-border/40">
                                <Editor
                                    onEditorChange={(newValue) =>
                                        setData('content', newValue)
                                    }
                                    value={data.content}
                                    licenseKey="gpl"
                                    init={{
                                        height: 800,
                                        menubar: true,
                                        base_url: '/tinymce',
                                        suffix: '.min',
                                        plugins: [
                                            'advlist',
                                            'autolink',
                                            'lists',
                                            'link',
                                            'image',
                                            'charmap',
                                            'anchor',
                                            'searchreplace',
                                            'visualblocks',
                                            'code',
                                            'fullscreen',
                                            'insertdatetime',
                                            'media',
                                            'table',
                                            'preview',
                                            'help',
                                            'wordcount',
                                        ],
                                        toolbar:
                                            'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                        content_style:
                                            'body { font-family:Inter,Arial,sans-serif; font-size:14px; background-color: #fcfdfe; }',
                                        skin: 'oxide',
                                    }}
                                />
                            </div>
                            {errors.content && (
                                <p className="px-1 text-xs font-bold text-destructive">
                                    {errors.content}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="meta_title"
                                        className="px-1 text-xs font-black tracking-widest text-muted-foreground uppercase"
                                    >
                                        Meta Title
                                    </Label>
                                    <Input
                                        id="meta_title"
                                        placeholder="SEO optimized title..."
                                        className="h-12 rounded-xl border-border/40 bg-muted/20 focus:ring-primary/20"
                                        value={data.meta_title}
                                        onChange={(e) =>
                                            setData(
                                                'meta_title',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.meta_title && (
                                        <p className="px-1 text-xs font-bold text-destructive">
                                            {errors.meta_title}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="meta_description"
                                        className="px-1 text-xs font-black tracking-widest text-muted-foreground uppercase"
                                    >
                                        Meta Description
                                    </Label>
                                    <Textarea
                                        id="meta_description"
                                        placeholder="Short summary for SEO..."
                                        className="min-h-[120px] rounded-xl border-border/40 bg-muted/20 focus:ring-primary/20"
                                        value={data.meta_description}
                                        onChange={(e) =>
                                            setData(
                                                'meta_description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.meta_description && (
                                        <p className="px-1 text-xs font-bold text-destructive">
                                            {errors.meta_description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="status"
                                            className="px-1 text-xs font-black tracking-widest text-muted-foreground uppercase"
                                        >
                                            Status
                                        </Label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(
                                                value:
                                                    | 'published'
                                                    | 'draft'
                                                    | 'scheduled',
                                            ) => setData('status', value)}
                                        >
                                            <SelectTrigger className="h-12 rounded-xl border-border/40 bg-muted/20">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">
                                                    Draft
                                                </SelectItem>
                                                <SelectItem value="scheduled">
                                                    Scheduled
                                                </SelectItem>
                                                <SelectItem value="published">
                                                    Published
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="px-1 text-xs font-bold text-destructive">
                                                {errors.status}
                                            </p>
                                        )}
                                    </div>

                                    {data.status === 'scheduled' && (
                                        <div className="animate-in space-y-2 fade-in slide-in-from-top-2">
                                            <Label
                                                htmlFor="scheduled_at"
                                                className="px-1 text-xs font-black tracking-widest text-muted-foreground uppercase"
                                            >
                                                Schedule Publishing
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="scheduled_at"
                                                    type="datetime-local"
                                                    className="h-12 rounded-xl border-border/40 bg-muted/20 focus:ring-primary/20"
                                                    value={data.scheduled_at}
                                                    onChange={(e) =>
                                                        setData(
                                                            'scheduled_at',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <Calendar className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted-foreground opacity-50" />
                                            </div>
                                            {errors.scheduled_at && (
                                                <p className="px-1 text-xs font-bold text-destructive">
                                                    {errors.scheduled_at}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <Label
                                        htmlFor="image"
                                        className="px-1 text-xs font-black tracking-widest text-muted-foreground uppercase"
                                    >
                                        Featured Image
                                    </Label>

                                    <div className="space-y-4">
                                        {data.image && (
                                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
                                                <img
                                                    src={URL.createObjectURL(
                                                        data.image,
                                                    )}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                <div className="absolute bottom-3 left-4">
                                                    <p className="mb-0.5 text-[10px] font-black tracking-[0.2em] text-white/80 uppercase">
                                                        Preview Mode
                                                    </p>
                                                    <p className="max-w-[250px] truncate text-sm font-bold text-white">
                                                        {data.image.name}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="group relative flex flex-col gap-4 overflow-hidden rounded-[2rem] border border-dashed border-border/60 bg-muted/5 p-8 transition-all hover:border-primary/40 hover:bg-muted/10">
                                            <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                                            <div className="relative flex flex-col items-center justify-center space-y-2 text-center">
                                                <div className="mb-1 rounded-full bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
                                                    <Plus className="h-6 w-6" />
                                                </div>
                                                <p className="text-sm font-bold text-foreground">
                                                    Click to upload or drag &
                                                    drop
                                                </p>
                                                <p className="text-[11px] font-medium text-muted-foreground">
                                                    PNG, JPG or WEBP up to 2MB
                                                </p>
                                            </div>
                                            <Input
                                                id="image"
                                                type="file"
                                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                onChange={(e) =>
                                                    setData(
                                                        'image',
                                                        e.target.files
                                                            ? e.target.files[0]
                                                            : null,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    {errors.image && (
                                        <p className="px-1 text-xs font-bold text-destructive">
                                            {errors.image}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 border-t border-border/10 pt-8">
                            <Button
                                type="button"
                                variant="ghost"
                                className="h-12 rounded-xl px-8 text-[11px] font-black tracking-widest uppercase"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="h-12 rounded-xl px-10 text-[11px] font-black tracking-widest uppercase transition-all hover:scale-[1.02]"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Processing...'
                                    : data.status === 'published'
                                      ? 'Publish Now'
                                      : data.status === 'scheduled'
                                        ? 'Schedule Post'
                                        : 'Save as Draft'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
