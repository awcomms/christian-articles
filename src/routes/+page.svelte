<script lang="ts">
	import { page } from '$app/stores';
	import PostsPagination from '$lib/components/PostsPagination.svelte';

	let current_page: number;
</script>

<PostsPagination page={current_page} posts={$page.data.posts} />
