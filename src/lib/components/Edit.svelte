<script lang="ts">
	export let disabled: boolean,
		post: Pick<Post, 'name' | 'body'> = { name: '', body: '' },
		show_delete = false;

	import { Button, ButtonSet, TextArea, TextInput } from 'carbon-components-svelte';
	import type { Post } from '$lib/types';
	import Save from 'carbon-icons-svelte/lib/Save.svelte'
	import View from 'carbon-icons-svelte/lib/View.svelte'
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="form">
	<TextInput {disabled} bind:value={post.name} labelText="Name" />
	<TextArea helperText="Markdown may be used" {disabled} bind:value={post.body} labelText="Body" />
	<ButtonSet stacked>
		<Button {disabled} icon={Save} on:click={() => dispatch('accept', post)}>Save</Button>
		<Button {disabled} icon={View} on:click={() => dispatch('accept', post)}>View this item's page</Button>
		{#if show_delete}
			<Button {disabled} on:click={() => dispatch('delete', post)}>Delete</Button>
		{/if}
	</ButtonSet>
</div>

<style lang="sass">
	.form
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
