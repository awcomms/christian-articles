<script lang="ts">
  import type { Post } from '$lib/types';
	import PostEntry from './PostEntry.svelte';

  export let posts: Post[];
</script>

{#each posts as post}
  <PostEntry {post} />
{/each}


