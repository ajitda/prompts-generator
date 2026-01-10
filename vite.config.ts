import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'node_modules/tinymce/*',
                    dest: '../../public/tinymce',
                },
            ],
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        dedupe: ['react', 'react-dom', '@inertiajs/react'],
    },
    ssr: {
        noExternal: [
            /^@radix-ui\/react-/,
            '@headlessui/react',
            'lucide-react',
            'react-hot-toast',
            'input-otp',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            '@tinymce/tinymce-react',
            'react',
            'qs',
            'react-dom',
            'lodash-es',
            '@inertiajs/react',
            '@inertiajs/core',
            '@inertiajs/server' 
        ],
    },
});
