<script lang="ts">
	import { TextInput, Button, Row, Loading, Modal } from 'carbon-components-svelte';
	import type { PostSearchDocument, RedisKey } from '$lib/types';
	import PostsPagination from './PostsPagination.svelte';
	import Search from 'carbon-icons-svelte/lib/Search.svelte';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';
	import OnEnter from './OnEnter.svelte';
	import { onMount } from 'svelte';
	import type { Filters as _Filters } from '$lib/types/filter';

	export let select = false,
		posts: PostSearchDocument[] = [],
		totalItems: number = 0,
		filters: _Filters = [];
	let loading = false,
		search: string,
		searched = false,
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
				notify({ title: `Encountered an error attempting to search for posts`, subtitle: e.response.data, kind: 'error' });
			})
			.finally(() => (loading = false));
	};
</script>

<OnEnter on:enter={() => get(page)} />

<!-- {#if show_filters}
	<Modal passiveModal>
		<Filters />
	</Modal>
{/if} -->

<Row noGutter>
	<TextInput bind:ref={search_input_ref} bind:value={search} />
	<Button size="field" on:click={() => get(page)} iconDescription="Search" icon={Search} />
</Row>

{#if loading}
	<Loading />
{:else if posts.length > 0}
	<PostsPagination
		on:select-click
		{select}
		{totalItems}
		on:update={({ detail }) => {
			get(detail.page);
		}}
		{posts}
		{page}
	/>
{:else}
	<div class="cta">
		<Button kind="ghost" size="xl" on:click={() => search_input_ref.focus()}>
			{searched && !posts.length ? `There don't seem to be any results for your search` : 'Search for an article'}</Button
		>
	</div>
{/if}

<style lang="sass">
	.cta
		display: flex
		align-items: center
		justify-content: center
</style>
