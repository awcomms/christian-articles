<script lang="ts">
	import type { Post, RedisKey } from '$lib/types';
	import { Button, CopyButton, InlineLoading } from 'carbon-components-svelte';
	import CuteButton from './CuteButton.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import CopyLinkButton from './CopyLinkButton.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import Share from 'carbon-icons-svelte/lib/Share.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import ConfirmDelete from './ConfirmDelete.svelte';
	import { del } from '$lib/util/redis/del';

	export let id: RedisKey, post: Post, is_user: boolean, navigate_on_delete: boolean;
	let delete_open = false,
		delete_loading = false;

	console.log(post);
</script>

<ConfirmDelete
	on:accept={() =>
		del(id).then(() => {
			if (navigate_on_delete) goto('/'); /**TODO goto previous page*/
		})}
	{id}
	name={post.name}
	bind:open={delete_open}
/>

<div class="article">
	<div class="title">
		<h2>{post.name}</h2>
		{#if is_user}
			<CuteButton
				onclick={async () => goto(`/post/${id}/edit`)}
				iconDescription="Edit this post"
				icon={Edit}
			/>
			<CuteButton
				onclick={async () => {
					delete_open = true;
				}}
				iconDescription="Delete this post"
				icon={delete_loading ? InlineLoading : TrashCan}
			/>
		{/if}
		<CopyButton
			feedback="This post has been copied to the clipboard"
			text={`${post.name}\n\n${post.body}`}
			iconDescription="Copy this post to the clipboard"
		/>
		{#if typeof navigator !== 'undefined' && navigator.share && navigator.canShare()}
			<Button
				on:click={() =>
					navigator.share({
						url: $page.url.toString(),
						text: `${post.name}`,
						title: `${post.name}`
					})}
				icon={Share}
				iconDescription="Share this article"
			/>
		{:else}
			<CopyLinkButton
				feedback="The link to this post has been copied to the clipboard"
				text={$page.url.toString()}
				iconDescription="Copy the link to this post to the clipboard"
			/>
		{/if}
	</div>
	<p>{@html post.html}</p>
</div>

<style lang="sass">
	.article
		display: flex
		flex-direction: column
		row-gap: 1rem

	.title
		display: flex
		flex-direction: row
		column-gap: 1rem
</style>
