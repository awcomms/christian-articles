<script lang="ts">
	import type { RedisKey, PostEntry as _PostEntry } from '$lib/types';
	import PostEntry from './PostEntry.svelte';
	export let posts: _PostEntry[],
		select = false,
		selected: RedisKey[] = [];

	const toggle_selected = (id: RedisKey) => {
		selected.includes(id) ? remove_from_selected(id) : add_to_selected(id);
	};

	const add_to_selected = (id: RedisKey) => {
		if (!selected.includes(id)) selected = [...selected, id];
	};

	const remove_from_selected = (id: RedisKey) => (selected = selected.filter((i) => i !== id));
</script>

{#each posts as post}
	<PostEntry
		on:click={() => toggle_selected(post.id)}
		{select}
		selected={selected.includes(post.id)}
		on:click
		{post}
	/>
{/each}
