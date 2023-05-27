<script lang="ts">
	export let disabled: boolean,
		post: Pick<Post, 'name' | 'body'> = { name: '', body: '' },
		show_delete = false;

	import { Button, ButtonSet, TextArea, TextInput } from 'carbon-components-svelte';
	import type { Post } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div>
	<TextInput {disabled} bind:value={post.name} labelText="Name" />
	<TextArea helperText="Markdown may be used" {disabled} bind:value={post.body} labelText="Body" />
	<ButtonSet stacked>
		<Button {disabled} on:click={() => dispatch('accept', post)}>Save</Button>
		{#if show_delete}
			<Button {disabled} on:click={() => dispatch('delete', post)}>Delete</Button>
		{/if}
	</ButtonSet>
</div>
