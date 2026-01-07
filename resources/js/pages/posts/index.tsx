import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
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
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Posts',
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
        if (confirm('Are you sure?')) {
            destroy(postsRoutes.destroy(id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manage Posts</h1>
                    <Button onClick={openCreate}>Add New Post</Button>
                </div>

                {/* Data Table */}
                <div className="rounded-lg border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="p-4 text-left">Title</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {posts.map((p) => (
                                <tr key={p.id}>
                                    <td className="p-4">{p.title}</td>
                                    <td className="space-x-2 p-4 text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openEdit(p)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Single Modal for Create & Update */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingPost ? 'Edit Post' : 'Create Post'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                />
                                {errors.title && (
                                    <p className="text-xs text-red-500">
                                        {errors.title}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="content">Content</Label>
                                <Editor
                                    tinymceScriptSrc="/tinymce/tinymce.min.js"
                                    onEditorChange={(newValue) =>
                                        setData('content', newValue)
                                    }
                                    value={data.content}
                                    licenseKey="gpl"
                                    init={{
                                        height: 300,
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
                                            'body { font-family:Inter,Arial,sans-serif; font-size:14px }',
                                    }}
                                />
                                {errors.content && (
                                    <p className="text-xs text-red-500">
                                        {errors.content}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="image">Featured Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files
                                                ? e.target.files[0]
                                                : null,
                                        )
                                    }
                                />
                                {editingPost?.image_original_name &&
                                    !data.image && (
                                        <p className="text-xs text-muted-foreground italic">
                                            Current file:{' '}
                                            {editingPost.image_original_name}
                                        </p>
                                    )}
                                {errors.image && (
                                    <p className="text-xs text-red-500">
                                        {errors.image}
                                    </p>
                                )}
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Save Changes
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
