<script lang="ts">
	import type { Post, RedisKey } from '$lib/types';
	import {
		Button,
		CopyButton,
		InlineLoading,
		InlineNotification,
		Link
	} from 'carbon-components-svelte';
	import CuteButton from './CuteButton.svelte';
	import { page } from '$app/stores';
	import { client_delete } from '$lib/util/client_del';
	import { goto } from '$app/navigation';
	import CopyLinkButton from './CopyLinkButton.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import Share from 'carbon-icons-svelte/lib/Share.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import { parse } from '$lib/util/markdown/parse/web';

	export let id: RedisKey, post: Post, is_user: boolean;

	console.log(post);
</script>

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
					await client_delete(id).then((r) => goto('/') /**TODO goto user's posts*/);
				}}
				iconDescription="Delete this post"
				icon={TrashCan}
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
