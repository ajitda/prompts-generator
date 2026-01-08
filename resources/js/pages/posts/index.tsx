import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import postsRoutes from '@/routes/posts';
import { BreadcrumbItem, PageProps, Post } from '@/types';
import { useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Blog Management',
        href: postsRoutes.index().url,
    },
];

export default function Index({ posts }: PageProps<{ posts: Post[] }>) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const {
        data,
        setData,
        post,
        reset,
        processing,
        errors,
        delete: destroy,
    } = useForm({
        title: '',
        content: '',
        image: null as File | null,
        _method: 'POST', // Default to POST
    });

    const openCreate = () => {
        setEditingPost(null);
        reset();
        setData('_method', 'POST');
        setIsOpen(true);
    };

    const openEdit = (item: Post) => {
        setEditingPost(item);
        // Pre-fill form and set method to PATCH for file support
        setData({
            title: item.title,
            content: item.content,
            image: null,
            _method: 'PATCH',
        });
        setIsOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPost) {
            post(postsRoutes.update(editingPost.id).url, {
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post(postsRoutes.store().url, {
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        reset();
    };

    const handleDelete = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this post? This action cannot be undone.',
            )
        ) {
            destroy(postsRoutes.destroy(id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="animate-reveal space-y-8">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">
                            Blog Management
                        </h1>
                        <p className="mt-1 font-medium text-muted-foreground">
                            Create and manage your articles for the community.
                        </p>
                    </div>
                    <Button
                        onClick={openCreate}
                        className="group h-11 rounded-xl px-6 shadow-lg transition-all hover:opacity-90"
                    >
                        <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                        Create New Article
                    </Button>
                </div>

                {/* Data Table */}
                <div className="shadow-elegant overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm">
                    <table className="w-full text-sm">
                        <thead className="border-b border-border/40 bg-muted/30">
                            <tr>
                                <th className="p-4 text-left text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                                    Article Title
                                </th>
                                <th className="w-40 p-4 text-right text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40 font-medium">
                            {posts.length > 0 ? (
                                posts.map((p) => (
                                    <tr
                                        key={p.id}
                                        className="group transition-colors hover:bg-muted/30"
                                    >
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                                                    {p.title}
                                                </span>
                                                {/* <span className="text-xs text-muted-foreground mt-0.5">Last updated: {new Date(p.updated_at).toLocaleDateString()}</span> */}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-lg text-muted-foreground transition-colors hover:text-primary"
                                                    onClick={() => openEdit(p)}
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-lg text-destructive/60 transition-colors hover:bg-destructive/10 hover:text-destructive"
                                                    onClick={() =>
                                                        handleDelete(p.id)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="p-12 text-center text-muted-foreground italic"
                                    >
                                        No articles found. Start by creating
                                        your first post!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Single Modal for Create & Update */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="overflow-hidden rounded-[32px] border-border/40 p-0 sm:max-w-[700px]">
                        <DialogHeader className="border-b border-border/10 bg-muted/10 p-6 pb-2">
                            <DialogTitle className="text-2xl font-black">
                                {editingPost
                                    ? 'Edit Article'
                                    : 'Compose New Article'}
                            </DialogTitle>
                            <DialogDescription>
                                {editingPost
                                    ? 'Refine your article content and updates.'
                                    : 'Draft a new blog post for your audience.'}
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={submit}
                            className="max-h-[85vh] space-y-6 overflow-y-auto p-6 pt-4"
                        >
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
                                    className="h-12 rounded-xl border-border/40 bg-muted/20 focus:ring-primary/20"
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
                                        key={editingPost?.id || 'new'}
                                        onEditorChange={(newValue) =>
                                            setData('content', newValue)
                                        }
                                        value={data.content}
                                        licenseKey="gpl"
                                        init={{
                                            height: 400,
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

                            <div className="space-y-6">
                                <Label
                                    htmlFor="image"
                                    className="px-1 text-xs font-black tracking-widest text-muted-foreground uppercase"
                                >
                                    Featured Image
                                </Label>

                                <div className="space-y-4">
                                    {(data.image || editingPost?.image) && (
                                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
                                            <img
                                                src={
                                                    data.image
                                                        ? URL.createObjectURL(
                                                              data.image,
                                                          )
                                                        : editingPost?.image
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
                                                        : editingPost?.image_original_name ||
                                                          'Current Asset'}
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
                                                Click to upload or drag & drop
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

                            <DialogFooter className="border-t border-border/10 pt-6">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="h-12 rounded-xl px-8 text-[11px] font-black tracking-widest uppercase"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="h-12 rounded-xl bg-indigo-600 px-10 text-[11px] font-black tracking-widest text-white uppercase transition-all hover:scale-[1.02]"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Processing...'
                                        : editingPost
                                          ? 'Update Article'
                                          : 'Publish Article'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
