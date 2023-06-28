<script lang="ts">
	export let filter: { field: string; on: boolean; value: boolean },
		value_label_on = '',
		value_label_off = '';
	import { Toggle } from 'carbon-components-svelte';
</script>

<Toggle bind:toggled={filter.on} />
{#if filter.on}
	<Toggle
		disabled={!filter.on}
		bind:toggled={filter.value}
		labelA={value_label_off}
		labelB={value_label_on}
	/>
{/if}
