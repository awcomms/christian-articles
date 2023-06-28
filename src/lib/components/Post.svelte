<script lang="ts">
	export let id: string, post: Post, should_pay: boolean, is_user: boolean;

	import { Button, ButtonSet, Link } from 'carbon-components-svelte';
	import PostView from './PostView.svelte';
	import type { Post } from '$lib/types';

	const replies_description = post.replies_description || 'Articles belonging to this article';
	const replied_description = post.replied_description || 'Articles this article belongs to';
</script>

<div>
	<p>Created: {new Date(post.created).toLocaleString()}</p>
	<Link href="/user/{post.creator}"
		>Creator: {post.creator} (Click here to see more posts from them)</Link
	>
	{#if post.updated}
		<p>Last Updated: {new Date(post.updated).toLocaleString()}</p>
	{/if}
</div>

<ButtonSet stacked>
	{#if should_pay && post.payment}
		<Button href="/post/{id}/pay"
			>Pay {post.payment.cost}NGN to access {replies_description || 'Parent articles'}
		</Button>
	{:else}
		<Button href="/post/{id}/replies">{replies_description || 'Child articles'}</Button>
	{/if}
	<Button href="/post/{id}/replied">{replied_description}</Button>
	<Button href="/post/{id}/similar">Similar posts</Button>
</ButtonSet>

<PostView navigate_on_delete={true} {is_user} {id} {post} />
