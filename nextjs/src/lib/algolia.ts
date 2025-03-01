import algoliasearch from "algoliasearch/lite";

export const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);

export const searchIndex = searchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!);
