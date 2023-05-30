<script lang="ts">
	import type { PostEntry as _PostEntry } from '$lib/types';
	import PostEntry from './PostEntry.svelte';
	export let posts: _PostEntry[];
</script>

{#each posts as post}
	<PostEntry {post} />
{/each}
