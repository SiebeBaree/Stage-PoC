import type { PageServerLoad } from "./$types";
import { contentfulClient } from "$lib";

export const load = (async () => {
    const carousel = await contentfulClient.getEntries({
        content_type: "carousel",
    });

    return {
        carousel,
    };
}) satisfies PageServerLoad;
