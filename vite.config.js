import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.ts"],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                globPatterns: ["*/*.*", "*.*"],
                navigateFallback: null,
            },
            manifest: {
                name: "Hospedaje Santa Lucía",
                short_name: "Santa Lucía",
                start_url: "/",
                display: "standalone",
                background_color: "#1D1D1D",
                theme_color: "#1D1D1D",
                lang: "es",
                scope: "/",
                icons: [
                    {
                        src: "/assets/img/sl2.jpg",
                        sizes: "192x192",
                        type: "image/jpg",
                        purpose: "maskable"
                    },
                    {
                        src: "/assets/img/sl2.jpg",
                        sizes: "512x512",
                        type: "image/jpg",
                        purpose: "maskable"
                    },
                ],
            },
        }),
    ],
});
