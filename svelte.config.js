import preprocess from "svelte-preprocess"
import adapter from "@sveltejs/adapter-node"

export default {
    kit: {
        adapter: adapter({
            // default options are shown
            out: 'build',
            precompress: true,
        }),
    },
    preprocess: preprocess(),
};
