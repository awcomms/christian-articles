<script lang="ts">
	import type { Post } from '$lib/types';
	import Posts from './Posts.svelte';
	import { Pagination } from 'carbon-components-svelte';
	import axios from 'axios';

	export let page: number, posts: Post[];
</script>

<Posts {posts} />

<Pagination totalItems={Number(await axios.get('/count'))} {page} />
