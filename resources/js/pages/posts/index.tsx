import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import postsRoutes from '@/routes/posts';
import { BreadcrumbItem, PageProps, Post } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { Edit2, Plus, Trash2 } from 'lucide-react';

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
    const { delete: destroy } = useForm();

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
                    <Link href={postsRoutes.create().url}>
                        <Button className="group h-11 rounded-xl px-6 shadow-lg transition-all hover:opacity-90">
                            <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                            Create New Article
                        </Button>
                    </Link>
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
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={
                                                        postsRoutes.edit(p.id)
                                                            .url
                                                    }
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-lg text-muted-foreground transition-colors hover:text-primary"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                </Link>
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
            </div>
        </AppLayout>
    );
}
