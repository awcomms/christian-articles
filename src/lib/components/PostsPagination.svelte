<script lang="ts">
	import type { PostSearchDocument } from '$lib/types';
	import Posts from './Posts.svelte';
	import { Loading, Pagination } from 'carbon-components-svelte';

	export let page: number = 1,
		totalItems: number,
		select = false,
		posts: PostSearchDocument[];

	let loading = false;

	// const get = async (page: number) => {
	// 	({ total: totalItems, documents: posts } = await axios
	// 		.post('/post/get', { page, filters })
	// 		.then((r) => r.data)
	// 		.catch((e) =>
	// 			notify({
	// 				title: 'Encountered an error attempting to fetch posts',
	// 				subtitle: e.response.data,
	// 				kind: 'error'
	// 			})
	// 		));
	// };
</script>

{#if loading}
	<Loading />
{:else}
	<Posts on:select-click on:select on:deselect {select} {posts} />
{/if}

<Pagination on:update pageSizeInputDisabled pageSize={7} {totalItems} {page} />
