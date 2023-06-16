<script lang='ts'>
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import Search from './Search.svelte';
	import PostsPagination from './PostsPagination.svelte';
	import type { PostEntry } from '$lib/types';

    export let totalItems: number, posts: PostEntry[]
</script>

<Tabs>
	<Tab label="Search" />
	<Tab label="Most Recent" />
	<svelte:fragment slot="content">
		<TabContent>
			<Search />
		</TabContent>
		<TabContent>
			<PostsPagination {totalItems} {posts} />
		</TabContent>
	</svelte:fragment>
</Tabs>
