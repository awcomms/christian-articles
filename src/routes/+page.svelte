<script lang="ts">
	import PostsPagination from '$lib/components/PostsPagination.svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import { Button, Tab, TabContent, Tabs, Row, Column } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import Search from '$lib/components/Search.svelte';
	export let data: PageData;
</script>

<Row>
	<Column>
		<div class="all">
			<Button href="/post/add" icon={Add}>Add an article</Button>
			<!-- <PostsPagination {...data} /> -->
			<Tabs>
				<Tab label="Most Recent" />
				<Tab label="Search" />
				<svelte:fragment slot="content">
					<TabContent>
						<PostsPagination {...data} />
					</TabContent>
					<TabContent>
						<Search totalItems={data.totalItems} />
					</TabContent>
				</svelte:fragment>
			</Tabs>
		</div>
	</Column>
</Row>

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
