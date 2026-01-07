import postsRoutes from '@/routes/posts';
import { Head, Link } from '@inertiajs/react';

interface PostSummary {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    created_at: string;
}

interface Props {
    posts: {
        data: PostSummary[];
        links: any[];
    };
}

export default function IndexPublic({ posts }: Props) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Blog - Prompts Generator" />

            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
                    Latest Insights
                </h1>
                <p className="mt-3 text-xl text-gray-500">
                    Tips and tricks for the best prompt engineering.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.data.map((post) => (
                    <Link
                        key={post.id}
                        href={postsRoutes.showPublic(post.slug).url}
                        className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
                    >
                        <div className="aspect-video w-full overflow-hidden bg-muted">
                            {post?.image ? (
                                <img
                                    src={`/storage/${post.image}`}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                            <p className="text-sm text-muted-foreground">
                                {new Date(post.created_at).toLocaleDateString()}
                            </p>
                            <h2 className="mt-2 line-clamp-2 text-xl font-bold group-hover:text-blue-600">
                                {post.title}
                            </h2>
                            <p className="mt-4 text-sm font-medium text-blue-600 underline">
                                Read More →
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Simple Pagination */}
            {posts.links.length > 3 && (
                <div className="mt-12 flex justify-center gap-2">
                    {posts.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`rounded border px-4 py-2 ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
