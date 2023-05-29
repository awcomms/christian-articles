<script lang="ts">
	import PostsPagination from '$lib/components/PostsPagination.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let current_page: number;
</script>

<PostsPagination page={current_page} posts={data.posts} />
