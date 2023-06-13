<script lang="ts">
	import { TextInput, Button, Row, Loading } from 'carbon-components-svelte';
	import type { PostEntry, RedisKey } from '$lib/types';
	import PostsPagination from './PostsPagination.svelte';
	import Search from 'carbon-icons-svelte/lib/Search.svelte';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';
	import OnEnter from './OnEnter.svelte';

	export let select = false,
		reference: RedisKey | undefined = undefined,
		selected: RedisKey[] = [];
	let loading = false,
		search: string,
		totalItems: number,
		posts: PostEntry[] = [],
		page: number = 1;

	$: get(page);

	const get = async (page: number) => {
		if (!search) return;
		loading = true;
		await axios
			.post('/post/search', { search, page, replied: reference ? reference : undefined })
			.then((r) => ({ total: totalItems, documents: posts } = r.data))
			.catch(() => notify('Error encountered getting results'))
			.finally(() => (loading = false));
		console.log('spd', posts);
	};
</script>

<OnEnter on:enter={() => get(page)} />

<Row>
	<TextInput bind:value={search} />
	<Button size="field" on:click={() => get(page)} iconDescription="Search" icon={Search} />
</Row>

{#if loading}
	<Loading />
{:else if posts.length > 0}
	<PostsPagination
		bind:selected
		{select}
		{totalItems}
		run_get={false}
		on:update={({ detail }) => {
			get(detail.page);
		}}
		{posts}
		{page}
	/>
{/if}
