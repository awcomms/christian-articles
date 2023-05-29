<script lang="ts">
	export let totalItems: number;

	import { TextInput, Button } from 'carbon-components-svelte';
	import type { PostEntry } from '$lib/types';
	import PostsPagination from './PostsPagination.svelte';
	import Search from 'carbon-icons-svelte/lib/Search.svelte';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';

	let input: string, posts: PostEntry[] = [], page: number = 1;

	$: get(page);

	const get = async (page: number) => {
		if (!input) return
		posts = await axios
			.post('/search', { input, page })
			.then((r) => r.data)
			.catch(() => notify('Error encountered getting results'));
		console.log('sp', posts)
	};
</script>

<TextInput bind:value={input} />
<Button on:click={() => get(page)} iconDescription="Search" icon={Search} />

<PostsPagination {totalItems} {posts} {page} />
