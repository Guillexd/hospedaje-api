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
                background_color: "#2E3C3B",
                theme_color: "#2E3C3B",
                lang: "es",
                scope: "/",
                icons: [
                  {
                    src: "/assets/img/sl2.jpg",
                    sizes: "32x32",
                    type: "image/jpg",
                },
                {
                    src: "/assets/img/sl2.jpg",
                    sizes: "96x96",
                    type: "image/jpg",
                },
                {
                    src: "/assets/img/sl2.jpg",
                    sizes: "128x128",
                    type: "image/jpg",
                },
                {
                    src: "/assets/img/sl2.jpg",
                    sizes: "256x256",
                    type: "image/jpg",
                },
                {
                    src: "/assets/img/sl2.jpg",
                    sizes: "512x512",
                    type: "image/jpg",
                },
                ],
            },
        }),
    ],
});
