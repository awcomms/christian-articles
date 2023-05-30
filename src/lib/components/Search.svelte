<script lang="ts">
	import { TextInput, Button, Row, Loading } from 'carbon-components-svelte';
	import type { PostEntry } from '$lib/types';
	import PostsPagination from './PostsPagination.svelte';
	import Search from 'carbon-icons-svelte/lib/Search.svelte';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';

	let loading = false,
		search: string,
		totalItems: number,
		posts: PostEntry[] = [],
		page: number = 1;

	$: get(page);

	const window_keydown = (e) => {
		if (e.key === 'Enter') get(page);
	};

	const get = async (page: number) => {
		if (!search) return;
		loading = true;
		await axios
			.post('/post/get', { search, page })
			.then((r) => ({ posts, totalItems } = r.data))
			.catch(() => notify('Error encountered getting results'))
			.finally(() => (loading = false));
		console.log('spd', posts);
	};
</script>

<svelte:window on:keydown={window_keydown} />

<Row>
	<TextInput bind:value={search} />
	<Button size="field" on:click={() => get(page)} iconDescription="Search" icon={Search} />
</Row>

{#if loading}
	<Loading />
{:else if posts.length > 0}
	<PostsPagination {totalItems} {posts} {page} />
{/if}
