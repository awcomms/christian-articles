<script lang="ts">
	import type { PostEntry } from '$lib/types';
	import { Modal, Button, ButtonSet, Link } from 'carbon-components-svelte';
	import View from 'carbon-icons-svelte/lib/View.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import Post from './Post.svelte';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { client_delete } from '$lib/util/client_del';

	export let post: PostEntry;
	let open = false;

	const dispatch = createEventDispatcher();
</script>

<Modal hasScrollingContent bind:open passiveModal>
	<Post id={post.id} post={post.value} />
</Modal>

<div class="post">
	<Link href="/post/{post.id}">{post.value.name}</Link>
	<div class="buttons">
		<Button
			kind="ghost"
			on:click={() => (open = true)}
			icon={View}
			iconDescription="View post details"
		/>
		{#if $page.data.sesssion?.user.email === post.value.user_email}
			<Button kind="ghost" href={`/post/${post.id}/edit`} iconDescription="Edit" icon={Edit} />
			<Button
				kind="ghost"
				icon={TrashCan}
				on:click={async () => await client_delete(post.id).then(() => dispatch('del'))}
			/>
		{/if}
		<slot name="buttons" />
	</div>
</div>

<style lang="sass">
	.buttons
		display: flex
		justify-content: flex-start
	.post 
		display: flex
		justify-content: space-between
		align-items: center
		padding: 0.7rem
</style>
