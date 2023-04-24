import preprocess from "svelte-preprocess"
import adapter from "@sveltejs/adapter-static"

export default {
    kit: {
        adapter: adapter(),
    },
    preprocess: preprocess(),
};
