<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<svelte:window
	on:keydown={({ key }) => {
		if (key === 'Enter') dispatch('enter');
	}}
/>
