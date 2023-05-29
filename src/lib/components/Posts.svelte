<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Post } from '$lib/types';
	import { Button } from 'carbon-components-svelte';
	import PostEntry from './PostEntry.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import {page}
 from "$app/stores"
	export let posts: Post[];
</script>

{#each posts as post}
	<PostEntry {post}>
		<div slot="buttons">
			{#if $page.data.session?.user?.email === post.user}
				<Button on:click={() => goto(`${post._id}/edit`)} iconDescription="Edit" icon={Edit} />
			{/if}
		</div>
	</PostEntry>
{/each}
