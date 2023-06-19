<script lang="ts">
	import type { RedisKey } from '$lib/types';
	import { Modal } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';

	export let id: RedisKey,
		name: string,
		open = false;

	const dispatch = createEventDispatcher();
</script>

<Modal
	bind:open
	primaryButtonText="Yes"
	primaryButtonIcon={TrashCan}
	on:click:button--primary={() => dispatch('accept')}
	modalHeading="Confirm deletion of {id}"
>
	<p>Are you sure you want to delete this post:</p>
	<em>{name}</em>
</Modal>
