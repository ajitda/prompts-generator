import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import postsRoutes from '@/routes/posts';
import { BreadcrumbItem, Post } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import { ArrowLeft, Plus, Save } from 'lucide-react';

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
        title: 'Edit Article',
        href: '#',
    },
];

export default function Edit({ post: postData }: { post: Post }) {
    const { data, setData, post, processing, errors } = useForm({
        title: postData.title,
        content: postData.content,
        image: null as File | null,
        meta_title: postData.meta_title || '',
        meta_description: postData.meta_description || '',
        _method: 'PATCH',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(postsRoutes.update(postData.id).url, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${postData.title}`} />
            <div className="animate-reveal mx-auto max-w-5xl space-y-8 pb-20">
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
                        <h1 className="text-3xl font-black tracking-tight text-foreground">
                            Edit Article
                        </h1>
                        <p className="mt-1 font-medium text-muted-foreground">
                            Refine your article content and metadata.
                        </p>
                    </div>
                </div>

                <div className="shadow-elegant overflow-hidden rounded-[32px] border border-border/40 bg-card/50 p-8 backdrop-blur-sm">
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
                                        height: 500,
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

                            <div className="space-y-4">
                                <Label
                                    htmlFor="image"
                                    className="px-1 text-xs font-black tracking-widest text-muted-foreground uppercase"
                                >
                                    Featured Image
                                </Label>

                                <div className="space-y-4">
                                    {(data.image || postData.image) && (
                                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
                                            <img
                                                src={
                                                    data.image
                                                        ? URL.createObjectURL(
                                                              data.image,
                                                          )
                                                        : postData.image ||
                                                          undefined
                                                }
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            <div className="absolute bottom-3 left-4">
                                                <p className="mb-0.5 text-[10px] font-black tracking-[0.2em] text-white/80 uppercase">
                                                    Preview Mode
                                                </p>
                                                <p className="max-w-[250px] truncate text-sm font-bold text-white">
                                                    {data.image
                                                        ? data.image.name
                                                        : postData.image_original_name ||
                                                          'Current Image'}
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
                                                Click to upload a new image
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
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
