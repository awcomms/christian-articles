<script lang="ts">
	export let post: Pick<Post, "name" | "body"> = {name: '', body: ''}, show_delete = false;

	import { Button, ButtonSet, TextArea, TextInput } from 'carbon-components-svelte';
	import type { Post } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div>
	<TextInput bind:value={post.name} labelText="Name" />
	<TextArea bind:value={post.body} labelText="Body" />
	<ButtonSet stacked>
		<Button on:click={() => dispatch('accept', post)}>Save</Button>
		{#if show_delete}
			<Button on:click={() => dispatch('delete', post)}>Delete</Button>
		{/if}
	</ButtonSet>
</div>
