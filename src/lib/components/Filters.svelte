<script lang="ts">
	import type { Filters } from '$lib/types/filter';
	import { Checkbox, NumberInput, TextInput, Toggle } from 'carbon-components-svelte';
	import Search from './Search.svelte';
	import type { RedisKey } from '$lib/types';
	import BooleanFilter from './BooleanFilter.svelte';

	let filters = [
			{
				field: 'requires_payment',
				on: false,
				value: false,
				filter_label: "Filter by posts that require or don't require payment",
				value_label_off: "Will return only posts that don't require payment",
				value_label_on: 'Will return only posts that require payment'
			},
			{
				field: 'owner',
				on: false,
				value: false,
				filter_label: 'Filter by posts that you own',
				value_label_off: 'Will return only posts that you own',
				value_label_on: `Will return only posts that you don't own`
			},
			{
				field: 'is_user',
				on: false,
				value: false,
				filter_label: 'Filter by posts that you manage',
				value_label_off: 'Will return only posts that you manage',
				value_label_on: `Will return only posts that you don't manage`
			}
			// { field: 'is_root', on: false, value: false, },
			// { field: 'is_edit', on: false, value: false },
			// { field: 'is_member', on: false, value: false },
			// { field: 'is_paid_for', on: false, value: false }
		],
		ancestors: RedisKey[] = [],
		descendants: RedisKey[] = [],
		ancestors_exclusive = false,
		descendants_exclusive = false;
</script>

<Search bind:selected={ancestors} />
<Search bind:selected={descendants} />

<Toggle
	label="All specified ancestors"
	bind:toggled={ancestors_exclusive}
	labelA="Will return posts that have any of the specified ancestors as ancestors"
	labelB="Will return posts that have all of the specified ancestors as ancestors"
/>

<Toggle
	label="All specified descendants"
	bind:toggled={descendants_exclusive}
	labelA="Will return posts that have any of the specified descendants as descendants"
	labelB="Will return posts that have all of the specified descendants as descendants"
/>

{#each filters as filter}
	<BooleanFilter
		bind:filter
		filter_label="Filter by posts that require or don't require payment"
		value_label="Post Requires Payment"
		value_label_off="Will return only posts that don't require payment"
		value_label_on="Will return only posts that require payment"
	/>
{/each}

<!-- <BooleanFilter bind:filter -->
