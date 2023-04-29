import { sveltekit } from "@sveltejs/kit/vite"

export default {
    plugins: [sveltekit()],
    server: {
        port: 3000,
    },
    build: {
        minify: true,
    }
};
