<script lang="ts">
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import Search from './Search.svelte';
	import PostsPagination from './PostsPagination.svelte';
	import type { PostSearchDocument } from '$lib/types';
	import type { Filters } from '$lib/types/filter';

	export let totalItems: number,
		posts: PostSearchDocument[],
		filters: Filters = [];
</script>

<Tabs>
	<Tab label="Search" />
	<Tab label="Most Recent" />
	<svelte:fragment slot="content">
		<TabContent>
			<Search {filters} />
		</TabContent>
		<TabContent>
			<PostsPagination {totalItems} {posts} />
		</TabContent>
	</svelte:fragment>
</Tabs>
