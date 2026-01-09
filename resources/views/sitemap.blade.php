<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{{ url('/') }}</loc>
        <lastmod>{{ now()->startOfMonth()->format('Y-m-d\TH:i:sP') }}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>{{ url('/privacy') }}</loc>
        <lastmod>2026-01-08T12:48:00+00:00</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>{{ url('/terms') }}</loc>
        <lastmod>2026-01-08T12:48:00+00:00</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>{{ url('/blog') }}</loc>
        <lastmod>2026-01-08T12:48:00+00:00</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>{{ url('/youtube') }}</loc>
        <lastmod>2026-01-08T12:48:00+00:00</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    @foreach ($posts as $post)
        <url>
            <loc>{{ url('/blog/' . $post->slug) }}</loc>
            <lastmod>{{ $post->updated_at->tz('UTC')->toAtomString() }}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
        </url>
    @endforeach
</urlset>
