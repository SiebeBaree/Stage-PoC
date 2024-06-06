import algoliasearch from "algoliasearch/lite";
import { PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_KEY, PUBLIC_ALGOLIA_INDEX_NAME } from "$env/static/public";

export const searchClient = algoliasearch(PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_KEY);

export const searchIndex = searchClient.initIndex(PUBLIC_ALGOLIA_INDEX_NAME);
