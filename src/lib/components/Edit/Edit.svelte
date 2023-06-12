<script lang="ts">
	export let save_loading = false,
		delete_loading = false,
		id: string | undefined = undefined,
		post: Pick<Post, 'name' | 'body' | 'allow_replies' | 'subscription'> = {
			name: '',
			body: '',
			allow_replies: false,
			subscription: {
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
	import type { Post } from '$lib/types';
	import Save from 'carbon-icons-svelte/lib/Save.svelte';
	import View from 'carbon-icons-svelte/lib/View.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { createEventDispatcher } from 'svelte';
	import OnEnter from '../OnEnter.svelte';

	const dispatch = createEventDispatcher();

	const dispatch_accept = () => dispatch('accept', post);
</script>

<OnEnter on:enter={dispatch_accept} />

<div class="form">
	<TextInput disabled={save_loading || delete_loading} bind:value={post.name} labelText="Name" />
	<TextArea
		helperText="Markdown may be used for the body of the post"
		disabled={save_loading || delete_loading}
		bind:value={post.body}
		labelText="Body"
	/>

	<p>Subscriptions</p>
	<Toggle
		bind:toggled={post.subscription.required}
		labelText="Require users to be subscribed to this post to view it's sub-posts"
	/>
	{#if post.subscription?.required}
		<Toggle
			bind:toggled={post.subscription.self}
			labelText="Require users to be subscribed to this post to view this post itself"
		/>
		<NumberInput
			label="Cost for a user to subscribe to this article (USD)"
			bind:value={post.subscription.cost}
		/>
		<Toggle
			bind:toggled={post.subscription.once}
			labelText="Allow Users have lifetime access to this post after a single one-time payment"
		/>
		{#if !post.subscription.once}
			<NumberInput
				bind:value={post.subscription.duration}
				label="Duration of a subscription (milliseconds)"
			/>
		{/if}
	{/if}
	<Toggle bind:toggled={post.allow_replies} labelText="Allow users to reply to this post" />
	<ButtonSet stacked>
		<Button
			disabled={save_loading || delete_loading}
			icon={save_loading ? InlineLoading : Save}
			on:click={dispatch_accept}>Save</Button
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
