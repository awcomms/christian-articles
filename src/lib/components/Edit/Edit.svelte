<script lang="ts">
	export let save_loading = false,
		delete_loading = false,
		id: string | undefined = undefined,
		post: EditablePost = {
			name: '',
			body: '',
			alias: '',
			alias_plural: '',
			replied_alias: '',
			replies_alias: '',
			allow_replies: false,
			payment: {
				required: false,
				cost: 0,
				once: false,
				duration: 1,
				self: false
			}
		};

	import {
		Button,
		ButtonSet,
		InlineLoading,
		NumberInput,
		TextArea,
		TextInput,
		Toggle
	} from 'carbon-components-svelte';
	import Save from 'carbon-icons-svelte/lib/Save.svelte';
	import View from 'carbon-icons-svelte/lib/View.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { createEventDispatcher } from 'svelte';
	import OnEnter from '../OnEnter.svelte';
	import type { EditablePost } from '$lib/types/Post';

	$: loading = save_loading || delete_loading;

	const dispatch = createEventDispatcher();

	const dispatch_accept = () => dispatch('accept', post);
</script>

<OnEnter on:enter={dispatch_accept} />

<div class="form">
	<TextInput disabled={loading} bind:value={post.name} labelText="Name" />
	<TextInput disabled={loading} bind:value={post.alias} labelText="Alias" />
	<!-- TODO - explain alias -->
	<TextInput disabled={loading} bind:value={post.alias_plural} labelText="Alias Plural" />
	<TextInput
		disabled={loading}
		bind:value={post.replies_alias}
		labelText="Description for Replies"
	/>
	<!-- TODO-UX-more_descriptive_labels -->
	<TextInput
		disabled={loading}
		bind:value={post.replied_alias}
		labelText="Description for Replied"
	/>
	<TextArea
		helperText="Markdown may be used for the body of the post"
		disabled={loading}
		bind:value={post.body}
		labelText="Body"
	/>

	<p>Payments</p>
	<Toggle
		bind:toggled={post.payment.required}
		labelText="Require users to be subscribed to this post to view it's sub-posts"
	/>
	{#if post.payment?.required}
		<Toggle
			bind:toggled={post.payment.self}
			labelText="Require users to be subscribed to this post to view this post itself"
		/>
		<NumberInput
			label="Cost for a user to subscribe to this article in Naira (NGN)"
			bind:value={post.payment.cost}
		/>
		<Toggle
			bind:toggled={post.payment.once}
			labelText="Allow Users have lifetime access to this post after a single one-time payment"
		/>
		{#if !post.payment.once}
			<NumberInput
				bind:value={post.payment.duration}
				label="Duration of a payment (milliseconds)"
			/>
		{/if}
	{/if}
	<Toggle bind:toggled={post.allow_replies} labelText="Allow users to reply to this post" />
	<ButtonSet stacked>
		<Button disabled={loading} icon={save_loading ? InlineLoading : Save} on:click={dispatch_accept}
			>Save</Button
		>
		{#if id}
			<Button
				disabled={loading}
				icon={delete_loading ? InlineLoading : TrashCan}
				on:click={() => dispatch('delete', post)}>Delete</Button
			>
			<Button disabled={loading} icon={View} href={`/post/${id}`}>View this item's page</Button>
		{/if}
	</ButtonSet>
</div>

<style lang="sass">
	.form
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
