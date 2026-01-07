import { Head, usePage } from '@inertiajs/react';

interface MetaProps {
    title?: string;
    description?: string;
    image?: string;
    canonical?: string;
    type?: 'website' | 'article';
}

export default function Meta({
    title,
    description = 'Generate high-performing YouTube video ideas, titles, and scripts with our AI-powered tool.',
    image,
    canonical,
    type = 'website',
}: MetaProps) {
    const { url, props } = usePage();
    const appUrl = (props.app_url as string) || 'https://videogen.test';
    const siteName = (props.name as string) || 'Video Idea Generator';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const currentUrl = canonical || `${appUrl}${url}`;
    const defaultImage = `${appUrl}/og-image.png`;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph */}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image || defaultImage} />
        </Head>
    );
}
