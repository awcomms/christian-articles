<script lang="ts">
	import type { PostEntry } from '$lib/types';
	import axios from 'axios';
	import Posts from './Posts.svelte';
	import { Loading, Pagination } from 'carbon-components-svelte';
	import { notify } from '$lib/util/notify';

	export let page: number, totalItems: number, posts: PostEntry[];

	let loading = false;

	const get = async (page: number) => {
		({ totalItems, posts } = await axios
			.get('/post', { params: { page } })
			.then((r) => r.data)
			.catch((e) => notify(e)));
	};
</script>

{#if loading}
	<Loading />
{:else}
	<Posts {posts} />
{/if}

<Pagination
	on:update={async ({ detail }) => {
		console.log(detail.page)
		loading = true;
		await get(detail.page).then(() => (loading = false));
	}}
	pageSizeInputDisabled
	pageSize={7}
	{totalItems}
	{page}
/>
