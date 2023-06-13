<script lang="ts">
	export let id: string,
		post: Post,
		similar: undefined | { posts: PostEntry[]; page: number; totalItems: number } = undefined;

	let reply_targets: RedisKey[] = [],
		reply_open = false,
		reply_loading = false;

	import {
		Button,
		ButtonSet,
		InlineLoading,
		Modal,
		Tab,
		TabContent
	} from 'carbon-components-svelte';
	import Reply from 'carbon-icons-svelte/lib/Reply.svelte';
	import type { Post, PostEntry, RedisKey } from '$lib/types';
	import SimilarPosts from './SimilarPosts.svelte';
	import PostView from './PostView.svelte';
	import Search from './Search.svelte';
	import axios from 'axios';
	import { page } from '$app/stores';
	import Paystack from './Paystack.svelte';

	const reply = async () => await axios.post(`/post/${id}/reply`, { targets: reply_targets });

	const pay = async () => {};
</script>

{#if $page.data.session?.user}
	<Modal
		bind:open={reply_open}
		modalHeading="Select posts to reply to"
		primaryButtonText="Reply"
		secondaryButtonText="Cancel"
		primaryButtonIcon={reply_loading ? InlineLoading : Reply}
		on:click:button--secondary={() => (reply_open = false)}
		on:click:button--primary={() => {
			reply_loading = true;
			reply().finally(() => (reply_loading = false));
		}}
		hasScrollingContent
	>
		<Search select bind:selected={reply_targets} />
	</Modal>
{/if}

<div>
	<p>Created: {new Date(post.created).toLocaleString}</p>
	<p>Last Updated: {new Date(post.updated).toLocaleString}</p>
</div>

<ButtonSet stacked>
	{#if $page.data.session?.user}
		<Button on:click={() => (reply_open = true)}>Reply with this post to other posts</Button>
	{/if}
	<Paystack button_props={{}} on:click={pay}>Subscribe to this post</Paystack>
</ButtonSet>

{#if similar}
	<Tab>
		<TabContent title="Post">
			<PostView {id} {post} />
		</TabContent>

		<TabContent title="Similar Posts">
			<SimilarPosts {id} {...similar} />
		</TabContent>
	</Tab>
{:else}
	<PostView {id} {post} />
{/if}
