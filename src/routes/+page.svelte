<script lang="ts">
	import PostsPagination from '$lib/components/PostsPagination.svelte';
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import Search from '$lib/components/Search.svelte';
	export let data: PageData;
	let current_page: number;
</script>

<Tabs>
	<Tab label="Most Recent" />
	<Tab label="Search" />
	<svelte:fragment slot="content">
		<TabContent>
			<PostsPagination page={current_page} totalItems={data.totalItems} posts={data.posts} />
		</TabContent>
		<TabContent>
			<Search totalItems={data.totalItems} />
		</TabContent>
	</svelte:fragment>
</Tabs>
