<script lang="ts">
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import { Button, Row, Column } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import Context from '$lib/components/Context.svelte';
	export let data: PageData;
</script>

<Row>
	<Column>
		<div class="all">
			<Button href="/post/add" icon={Add}>Create an article</Button>
			<Context totalItems={data.total} posts={data.documents} />
		</div>
	</Column>
</Row>

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
