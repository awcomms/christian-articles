<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Post } from '$lib/types';
	import { owner } from '$lib/util/owner';
	import { Button } from 'carbon-components-svelte';
	import PostEntry from './PostEntry.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';

	export let posts: Post[];
</script>

{#each posts as post}
	<PostEntry {post}>
		<div slot="buttons">
			{#if owner(post.id)}
				<Button on:click={() => goto(`${post.id}/edit`)} iconDescription="Edit" icon={Edit} />
			{/if}
		</div>
	</PostEntry>
{/each}
