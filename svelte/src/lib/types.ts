type ContentfulImage = {
    fields: {
        title: string;
        description?: string;
        file: {
            url: string;
            contentType: string;
        };
    };
};

export type Carousel = {
    items: {
        fields: {
            name: string;
            image: ContentfulImage;
            redirect: string;
            buttonText: string;
        };
    }[];
};

type AlgoliaHit = {
    categories_ids?: number[];
    description?: string;
    image_url: string;
    is_visible: boolean;
    name: string;
    default_price: number;
    product_images?: {
        description: string;
        is_thumbnail: boolean;
        url_thumbnail: string;
    }[];
    sku: string;
    objectID: string;
};

export type AlgoliaSearch = {
    hits: AlgoliaHit[];
    query: string;
    nbHits: number;
    nbPages: number;
    hitsPerPage: number;
    page: number;
    queryID: string;
};
