<script lang="ts">
    import { Input } from '$lib/components/ui/input';
    import { querySchema } from '$lib/schema';
    import { searchIndex } from '$lib/algolia';
    import { SearchIcon } from 'lucide-svelte';
    import { cn } from '$lib/utils';
    import type { AlgoliaSearch } from '$lib/types';
    import { ChevronRightIcon } from 'lucide-svelte';

    let input: any = $state();
    let query: string = $state('');
    let timer: any = $state();
    let result: AlgoliaSearch | null = $state(null);

    $effect(() => {
        search().then((response) => {
            if (response !== undefined) {
                result = response as unknown as AlgoliaSearch;
            }
        });
    });

    const debounce = (v: string) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            query = v;
        }, 200);
    };

    async function search() {
        const parsedQuery = querySchema.safeParse(query);
        if (!parsedQuery.success) return;

        return await searchIndex.search(parsedQuery.data, {
            hitsPerPage: 4,
        });
    }

    function goToProduct(productID: string, position: number) {
        result = null;
        window.location.href = `/product/${productID}`;
    }
</script>

<div class='flex justify-center w-[800px]'>
    {#if result}
        <div
            class="fixed inset-0 bg-black/40 h-screen w-screen top-0 left-0 z-40 overflow-hidden"
        ></div>
    {/if}

    <div class="relative h-10 w-[800px] z-50">
        <SearchIcon
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary z-10"
        />
        <Input
            id="search"
            type="text"
            placeholder="Search"
            class="pl-12 pr-3 py-2 w-full focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-muted"
            oninput={(e: any) => (input = e.currentTarget)}
            onkeyup={(e: any) => debounce(e.currentTarget.value)}
            onfocusin={() => {
                if (query) {
                    search().then((response) => {
                        if (response !== undefined) {
                            result = response as unknown as AlgoliaSearch;
                        }
                    });
                }
            }}
            onfocusout={(e: any) => {
                const dropdownElement =
                    e.currentTarget.parentElement?.nextElementSibling;
                if (
                    dropdownElement &&
                    !dropdownElement.contains(e.relatedTarget as any)
                ) {
                    result = null;
                }
            }}
        />
    </div>

    {#if result}
        <div
            class='mt-12 z-50 w-[800px] bg-white rounded-lg max-h-[400px] overflow-hidden flex flex-col absolute text-black'
        >
            {#if result.hits.length === 0}
                <p class="p-2 text-center w-full text-lg font-medium py-12">
                    No results found.
                </p>
            {:else}
                {#each result.hits as hit, index}
                    <button
                        class={cn(
                            'flex items-center p-2 w-full',
                            result.hits.length === index + 1
                                ? 'border-b-0'
                                : 'border-b border-b-muted',
                        )}
                        onclick={() => goToProduct(hit.objectID, index + 1)}
                    >
                        <img
                            src={hit.image_url}
                            alt="{hit.name} product"
                            class="h-20 w-20 rounded object-cover"
                        />
                        <div class="pl-3">
                            <h2 class="text-lg font-semibold">{hit.name}</h2>
                            <p class="text-left">€ {hit.default_price}</p>
                        </div>
                        <div class="flex-grow flex justify-end">
                            <ChevronRightIcon />
                        </div>
                    </button>
                {/each}
            {/if}
        </div>
    {/if}
</div>
