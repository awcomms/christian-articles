<script lang="ts">
	// import PostsPagination from '$lib/components/PostsPagination.svelte';
	import { Button, ButtonSet, Column, Row, Truncate } from 'carbon-components-svelte';
	// import Replies from '$lib/components/Replies.svelte';
	import type { PageData } from './$types';
	import Search from '$lib/components/Search.svelte';

	export let data: PageData;
</script>

<Row>
	<Column>
		<div>Replies to {data.post.name}</div>
		
		{#if data.post.allow_replies && data?.session?.user}
			<ButtonSet stacked>
				<Button href="/post/{data.post.id}/reply/existing">Reply to this post with existing posts</Button>
				<Button href="/post/{data.post.id}/reply/new">Reply to this post with a new post</Button>
			</ButtonSet>
		{/if}
		
		<Search posts={data.documents} filters={data.filters} totalItems={data.total} />
	</Column>
</Row>
