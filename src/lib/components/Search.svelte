<script lang="ts">
	import { TextInput, Button, Row, Loading } from 'carbon-components-svelte';
	import type { PostSearchDocument, RedisKey } from '$lib/types';
	import PostsPagination from './PostsPagination.svelte';
	import Search from 'carbon-icons-svelte/lib/Search.svelte';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';
	import OnEnter from './OnEnter.svelte';
	import { onMount } from 'svelte';
	import type { Filters } from '$lib/types/filter';

	export let select = false,
		filters: Filters = [],
		selected: RedisKey[] = [];
	let loading = false,
		search: string,
		searched = false,
		totalItems: number,
		posts: PostSearchDocument[] = [],
		page: number = 1;

	$: get(page);

	onMount(() => search_input_ref.focus());

	let search_input_ref: HTMLInputElement;
	const get = async (page: number) => {
		if (!search) return;
		searched = true;
		loading = true;
		await axios
			.post('/post/search', { search, page, filters })
			.then((r) => ({ total: totalItems, documents: posts } = r.data))
			.catch((e) => {
				notify({ title: `An error occured`, subtitle: e });
			})
			.finally(() => (loading = false));
	};
</script>

<OnEnter on:enter={() => get(page)} />

<Row>
	<TextInput bind:ref={search_input_ref} bind:value={search} />
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
{:else}
	<div class="cta">
		<Button kind="ghost" size="xl" on:click={() => search_input_ref.focus()}>
			Search for an article</Button
		>
	</div>
{/if}

<style lang="sass">
	.cta
		display: flex
		align-items: center
		justify-content: center
</style>
