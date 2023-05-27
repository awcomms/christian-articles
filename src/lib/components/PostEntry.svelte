<script lang="ts">
	import type { Post as _Post } from '$lib/types';
	import { Modal, Button, ButtonSet } from 'carbon-components-svelte';
	import View from 'carbon-icons-svelte/lib/View.svelte';
	import Post from './Post.svelte';

	export let post: _Post;
	let open = false;
</script>

<Modal hasScrollingContent bind:open passiveModal>
	<Post {post} />
</Modal>

<div class="post">
	<p>{post.name}</p>
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
