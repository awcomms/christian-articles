<script lang="ts">
	import { page } from '$app/stores';
	import { PAYSTACK_PK_LIVE, PAYSTACK_PK_TEST, PAYSTACK_TEST } from '$env/static/private';
	import { Button } from 'carbon-components-svelte';
	import type { ButtonProps } from 'carbon-components-svelte/types/Button/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import { v4 } from 'uuid';

    
    const key = PAYSTACK_TEST ? PAYSTACK_PK_TEST : PAYSTACK_PK_LIVE
	const dispatch = createEventDispatcher();

	export let amount: number,
		button_props: ButtonProps,
		metadata: unknown,
		currency: 'NGN' | 'GHS' | 'ZAR' | 'USD';

	const request_payment = () => {
		PaystackPop.setup({
			key,
			email: $page.data.session?.user?.email,
			metadata,
			currency,
            channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
			amount: amount * 100,
			ref: v4(),
			callback: (response) => {
				dispatch('paid', response.reference);
			},
			onClose: () => dispatch('close')
		});
	};
</script>

<Button {...button_props} on:click={request_payment}><slot name="button" /></Button>

<svelte:head>
	<script src="https://js.paystack.co/v1/inline.js"></script>
</svelte:head>
