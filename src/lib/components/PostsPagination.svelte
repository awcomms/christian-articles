<script lang="ts">
	import type { PostEntry } from '$lib/types';
	import Posts from './Posts.svelte';
	import { InlineLoading, Pagination } from 'carbon-components-svelte';
	import axios from 'axios';

	export let page: number, posts: PostEntry[];
	// const get_total_items = axios.get('/count').then((r) => Number(r.data));
	// get_total_items.then((r) => console.log('total', r));
</script>

<Posts {posts} />

<!-- {#await get_total_items}
	<InlineLoading />
{:then totalItems} -->
<Pagination {page} />
<!-- <Pagination {totalItems} {page} /> -->
<!-- {/await} -->
