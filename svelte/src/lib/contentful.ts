import contentful from "contentful";
import { CONTENTFUL_SPACE_ID, CONTENTFUL_TOKEN, CONTENTFUL_ENVIRONMENT } from "$env/static/private";

export const contentfulClient = contentful.createClient({
    space: CONTENTFUL_SPACE_ID,
    environment: CONTENTFUL_ENVIRONMENT,
    accessToken: CONTENTFUL_TOKEN,
});
