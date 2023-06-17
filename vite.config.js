import { sveltekit } from "@sveltejs/kit/vite"
import * as dotenv from "dotenv"

let env = dotenv.config().parsed

export default {
    plugins: [sveltekit()],
    server: {
        port: Number(env.PORT),
    },
    build: {
        minify: true,
    }
};
