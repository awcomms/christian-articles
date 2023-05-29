<script lang="ts">
	import type { PostEntry } from '$lib/types';
	import Posts from './Posts.svelte';
	import { Pagination } from 'carbon-components-svelte';

	export let page: number, totalItems: number, posts: PostEntry[];
</script>

<Posts {posts} />

<Pagination pageSizeInputDisabled pageSize={21} {totalItems} {page} />
