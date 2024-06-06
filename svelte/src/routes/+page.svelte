<script lang="ts">
    import Search from '$lib/components/search.svelte';
import type { Carousel } from '$lib/types.js';

    type PageProps = {
        data: {
            carousel: Carousel;
        }
    }

    const { data }: PageProps = $props();
</script>

<nav>
    <h1>Svelte PoC</h1>

    <div class="search">
        <Search />
    </div>
</nav>

{#if data.carousel}
    <div class="items">
        {#each data.carousel.items as item}
            <div class="item-card">
                <img src={item.fields.image.fields.file.url} alt={item.fields.image.fields.description} />
                <button>{item.fields.buttonText}</button>
            </div>
        {/each}
    </div>
{/if}

<style>
    nav {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        background-color: #3e4cca;
        color: white;
    }

    nav h1 {
        font-size: 1.5rem;
    }

    .search {
        display: flex;
        justify-content: center;
        width: 800px;
    }

    .items {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .item-card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .item-card img {
        width: 100%;
        height: auto;
    }

    .item-card button {
        background-color: #3e4cca;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
</style>