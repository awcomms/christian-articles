<script lang="ts">
	export let id: string, post: Post, paid: boolean;

	import { Button, ButtonSet, Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import PostView from './PostView.svelte';
	import type { Post } from '$lib/types';
</script>

<div>
	<p>Created: {new Date(post.created).toLocaleString()}</p>
	<p>Last Updated: {new Date(post.updated).toLocaleString}</p>
</div>

<ButtonSet stacked>
	<Button href="/post/{id}/replied"
		>Click here to see {post.replied_alias} this {post.alias} belongs to</Button
	>
	<Button href="/post/{id}/similar">Click here to see posts similar to this post</Button>
	{#if paid}
		<Button href="/post/{id}/replies"
			>Click here to see {post.replies_alias} in this {post.alias}</Button
		>
	{:else}
		<Button href="/post/{id}/pay"
			>Click here to pay for access to {post.replies_alias} under this {post.alias}
		</Button>
	{/if}
</ButtonSet>

<PostView {id} {post} />
