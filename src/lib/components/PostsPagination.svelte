<script lang="ts">
	import type { Post } from '$lib/types';
	import Posts from './Posts.svelte';
	import { Pagination } from 'carbon-components-svelte';
	import axios from 'axios';

	export let page: number, posts: Post[];
	const get_total_items = axios.get('/count').then((r) => Number(r.data));
</script>

<Posts {posts} />

{#await get_total_items then totalItems}
	<Pagination {totalItems} {page} />
{/await}
