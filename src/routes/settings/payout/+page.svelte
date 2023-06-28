<!-- <script lang="ts">
	import {
		Button,
		Column,
		NumberInput,
		Row,
		Select,
		TextInput
	} from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Paystack from '$lib/components/Paystack.svelte';

	// export let data: PageData;

	const metadata = {
		endpoint: $page.url.toString(),
		args: {
			amount: 0,
			name: '',
			number: +233,
			// bank: data.banks[0],
			reason: ''
		}
	};
</script> -->

<!-- <Row>
	<Column>
		<div class="all">
			<Select
				labelText="Select the network"
				bind:selected={metadata.args
					.bank}
			>
				<!-- {#each data.banks as b}
					<Select value={b} />
				{/each} -->
			</Select>

			<TextInput
				bind:value={metadata.args
					.name}
				labelText="Mobile Money Account Name"
			/>
			<TextInput
				bind:value={metadata.args
					.number}
				labelText="Mobile Money Account Number"
			/>
			<TextInput
				bind:value={metadata.args
					.reason}
				labelText="Reason for transfer"
			/>
			<NumberInput
				bind:value={metadata.args
					.amount}
				label="Amount to send"
			/>

			<Paystack
				{metadata}
				amount={metadata.args.amount}
				currency="GHS"
				button_props={{}}
				>Send</Paystack
			>
		</div>
	</Column>
</Row>

<style lang="sass">
	@use '@carbon/layout'
	.all
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-05
</style> -->
