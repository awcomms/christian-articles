<script lang="ts">
	export let save_loading = false,
		delete_loading = false,
		id: string | undefined = undefined,
		post: Pick<Post, 'name' | 'body'> = { name: '', body: '' };

	import { Button, ButtonSet, InlineLoading, TextArea, TextInput } from 'carbon-components-svelte';
	import type { Post } from '$lib/types';
	import Save from 'carbon-icons-svelte/lib/Save.svelte';
	import View from 'carbon-icons-svelte/lib/View.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="form">
	<TextInput disabled={save_loading || delete_loading} bind:value={post.name} labelText="Name" />
	<TextArea
		helperText="Markdown may be used for the body of the post"
		disabled={save_loading || delete_loading}
		bind:value={post.body}
		labelText="Body"
	/>
	<ButtonSet stacked>
		<Button
			disabled={save_loading || delete_loading}
			icon={save_loading ? InlineLoading : Save}
			on:click={() => dispatch('accept', post)}>Save</Button
		>
		{#if id}
			<Button
				disabled={save_loading || delete_loading}
				icon={delete_loading ? InlineLoading : TrashCan}
				on:click={() => dispatch('delete', post)}>Delete</Button
			>
			<Button disabled={save_loading || delete_loading} icon={View} href={`/post/${id}`}
				>View this item's page</Button
			>
		{/if}
	</ButtonSet>
</div>

<style lang="sass">
	.form
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
