<script lang="ts">
	import type { RedisKey, PostSearchDocument } from '$lib/types';
	import PostEntry from './PostEntry.svelte';
	export let posts: PostSearchDocument[],
		select = false;
	// 	selected: RedisKey[] = [];

	// const toggle_selected = (id: RedisKey) => {
	// 	selected.includes(id) ? remove_from_selected(id) : add_to_selected(id);
	// };

	// const add_to_selected = (id: RedisKey) => {
	// 	if (!selected.includes(id)) selected = [...selected, id];
	// };

	// const remove_from_selected = (id: RedisKey) => (selected = selected.filter((i) => i !== id));
</script>

{#each posts as post}
	<PostEntry
		on:select-click
		on:deselect
		{select}
		on:click
		{post}
	/>
{/each}
