import { Head } from '@inertiajs/react';

type SeoProps = {
    title: string;
    description: string;
    image_url?: string;
    schema?: Record<string, unknown>;
};

export default function Seo({ title, description, image_url, schema }: SeoProps) {
    const url = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {image_url && <meta property="og:image" content={image_url} />}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            {image_url && <meta property="twitter:image" content={image_url} />}

            {/* JSON-LD Schema */}
            {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
        </Head>
    );
}
