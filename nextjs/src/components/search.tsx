"use client";

import { searchIndex } from "@/lib/algolia";
import { querySchema } from "@/lib/schema";
import { AlgoliaSearch } from "@/lib/types";
import { useEffect, useState } from "react";
import { ChevronRightIcon, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils";

export default function Search() {
    const [input, setInput] = useState<string>("");
    const [query] = useDebounce(input, 200);
    const [result, setResult] = useState<AlgoliaSearch | null>(null);

    useEffect(() => {
        console.log("searching");
        search().then((response) => {
            if (response !== undefined) {
                setResult(response as unknown as AlgoliaSearch);
            }
        });
    }, [query]);

    async function search() {
        const parsedQuery = querySchema.safeParse(query);
        if (!parsedQuery.success) return;

        return await searchIndex.search(parsedQuery.data, {
            hitsPerPage: 4,
        });
    }

    function goToProduct(productID: string, position: number) {
        setResult(null);
        alert(`Navigating to product ${productID} at position ${position}`);
    }

    return (
        <div className="flex justify-center w-[800px]">
            {result && (
                <div className="fixed inset-0 bg-black/40 h-screen w-screen top-0 left-0 z-40 overflow-hidden" />
            )}

            <div className="relative h-10 w-[800px] z-50">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary z-10" />
                <Input
                    id="search"
                    type="text"
                    placeholder="Search"
                    className="pl-12 pr-3 py-2 w-full focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-muted"
                    onInput={(e: any) => setInput(e.currentTarget.value)}
                    onFocus={() => {
                        if (query) {
                            search().then((response) => {
                                if (response !== undefined) {
                                    setResult(response as unknown as AlgoliaSearch);
                                }
                            });
                        }
                    }}
                    onBlur={(e: any) => {
                        const dropdownElement = e.currentTarget.parentElement?.nextElementSibling;
                        if (dropdownElement && !dropdownElement.contains(e.relatedTarget as any)) {
                            setResult(null);
                        }
                    }}
                />
            </div>

            {result && (
                <div className="mt-12 z-50 w-[800px] bg-white rounded-lg max-h-[400px] overflow-hidden flex flex-col absolute text-black">
                    {result.hits.length === 0 ? (
                        <p className="p-2 text-center w-full text-lg font-medium py-12">No results found.</p>
                    ) : (
                        result.hits.map((hit, index) => (
                            <button
                                className={cn(
                                    "flex items-center p-2 w-full",
                                    result.hits.length === index + 1 ? "border-b-0" : "border-b border-b-muted",
                                )}
                                onClick={() => goToProduct(hit.objectID, index + 1)}
                            >
                                <img
                                    src={hit.image_url}
                                    alt={`${hit.name} product`}
                                    className="h-20 w-20 rounded object-cover"
                                />
                                <div className="pl-3">
                                    <h2 className="text-lg font-semibold">{hit.name}</h2>
                                    <p className="text-left">€ {hit.default_price}</p>
                                </div>
                                <div className="flex-grow flex justify-end">
                                    <ChevronRightIcon />
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
