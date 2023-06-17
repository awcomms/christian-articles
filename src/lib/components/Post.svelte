<script lang="ts">
	export let id: string, post: Post, should_pay: boolean, is_user: boolean;

	import { Button, ButtonSet, Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import PostView from './PostView.svelte';
	import type { Post } from '$lib/types';
</script>

<div>
	<p>Created: {new Date(post.created).toLocaleString()}</p>
	{#if post.updated}
		<p>Last Updated: {new Date(post.updated).toLocaleString()}</p>
	{/if}
</div>

<ButtonSet stacked>
	{#if should_pay}
		<Button href="/post/{id}/replies">{post.replies_description}</Button>
	{:else}
		<Button href="/post/{id}/pay"
			>Pay {post.payment.cost}NGN to access {post.replies_description}
		</Button>
	{/if}
	<Button href="/post/{id}/replied">{post.replied_description}</Button>
	<Button href="/post/{id}/similar">Similar posts</Button>
</ButtonSet>

<PostView {is_user} {id} {post} />
