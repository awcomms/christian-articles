<script lang="ts">
	export let id: string, post: Post;

	import { Button, ButtonSet, CopyButton, Tab, TabContent } from 'carbon-components-svelte';
	import type { Post } from '$lib/types';
	// import PostsPagination from './PostsPagination.svelte';
	// import axios from 'axios';
	import { goto } from '$app/navigation';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import { page } from '$app/stores';
	import { client_delete } from '$lib/util/client_del';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';

	let current_page: number, posts: Post[];

	// $: get(current_page);

	// const get = async (page: number) => {
	// 	posts = await axios.post('/similar_posts', { id: post._id, page });
	// };
</script>

{#if $page.data.session?.user === post.user}
	<ButtonSet>
		<Button on:click={() => goto(`${id}/edit`)} iconDescription="Edit" icon={Edit} />
			<Button
				icon={TrashCan}
				on:click={async () => await client_delete(id)}
			/>
	</ButtonSet>
{/if}

<!-- <div>
	<p>Created: {post.created.toLocaleString}</p>
	<p>Last Modified: {post.last_modified.toLocaleString}</p>
</div> -->



<!-- <Tab> -->
<!-- <TabContent title="Post"> -->
<div class="article">
	<div class="title">
		<h2>{post.name}</h2>
		<CopyButton
		feedback="The link to this post has been copied to the clipboard"
		text={`${$page.url}`}
		iconDescription="Copy the link to this post"
	/>
	</div>
	<p>{post.body}</p>
</div>
<!-- </TabContent> -->

<!-- <TabContent title="Similar Posts">
		<PostsPagination {posts} page={current_page} />
	</TabContent> -->
<!-- </Tab> -->

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
