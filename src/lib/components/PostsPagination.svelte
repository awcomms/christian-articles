<script lang="ts">
	import type { PostEntry } from '$lib/types';
	import axios from 'axios';
	import Posts from './Posts.svelte';
	import { Loading, Pagination } from 'carbon-components-svelte';
	import { notify } from '$lib/util/notify';

	export let filters: Record<string, string> = {}, run_get = true,
		page: number = 1,
		totalItems: number,
		posts: PostEntry[];

	let loading = false;

	const get = async (page: number) => {
		({ totalItems, posts } = await axios
			.post('/post/get', { page, filters })
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
	on:update
	on:update={async ({ detail }) => {
		if (!run_get) return
		loading = true;
		await get(detail.page).then(() => (loading = false));
	}}
	pageSizeInputDisabled
	pageSize={7}
	{totalItems}
	{page}
/>
