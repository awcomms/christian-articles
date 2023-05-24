<script lang="ts">
	import { Tab, TabContent } from 'carbon-components-svelte';
	import type { Post } from '$lib/types';
	import PostsPagination from './PostsPagination.svelte';
	import axios from 'axios';

	export let post: Pick<Post, 'id' | 'name' | 'body'>;

	let page: number, posts: Post[];

	$: get(page);

	const get = async (page: number) => {
		posts = await axios.post('/similar_posts', { id: post.id, page });
	};
</script>

<Tab>
	<TabContent title="Post">
		<h2>{post.name}</h2>
		<p>{post.body}</p>
	</TabContent>

	<TabContent title="Similar Posts">
		<PostsPagination {posts} {page} />
	</TabContent>
</Tab>
