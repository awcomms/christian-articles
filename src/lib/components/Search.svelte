<script lang="ts">
	import { TextInput, Button } from 'carbon-components-svelte';
	import type { PostEntry } from '$lib/types';
	import PostsPagination from './PostsPagination.svelte';
	import Search from 'carbon-icons-svelte/lib/Search.svelte';
	import axios from 'axios';

	let value: string, posts: PostEntry[], page: number;

	const get = async () => {
		posts = await axios
			.post('/search', value)
			.then((r) => r.data)
			.catch(() => alert('Error encountered getting results'));
	};
</script>

<TextInput bind:value />
<Button on:click={get} iconDescription="Search" icon={Search} />

<PostsPagination {posts} {page} />
