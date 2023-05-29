<script lang="ts">
	import type { PostEntry } from '$lib/types';
	import { Modal, Button, ButtonSet } from 'carbon-components-svelte';
	import View from 'carbon-icons-svelte/lib/View.svelte';
	import Post from './Post.svelte';

	export let post: PostEntry;
	let open = false;
</script>

<Modal hasScrollingContent bind:open passiveModal>
	<Post id={post.id} post={post.value} />
</Modal>

<div class="post">
	<p>{post.value.name}</p>
	<div class="after">
		<ButtonSet>
			<slot name="buttons" />
			<Button on:click={() => (open = true)} icon={View} iconDescription="View post details" />
		</ButtonSet>
	</div>
</div>

<style>
	.post {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		margin-bottom: 1rem;
	}
</style>
