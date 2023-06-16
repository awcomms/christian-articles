<script lang="ts">
	import { page } from '$app/stores';

	import Paystack from '$lib/components/Paystack.svelte';
	import { friendly_milliseconds } from '$lib/util/friendly_milliseconds';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="label">Post name:</div>
<div class="name">{data.name}</div>

<p>
	The above post requires a {data.once
		? 'one time payment'
		: `payment every ${friendly_milliseconds(data.duration || 0)}`} of {data.cost} NGN to access it{data.self
		? ''
		: `'s ${data.replies_alias}'`}
</p>

<Paystack
	metadata={{ endpoint: $page.url.toString(), args: { id: data.id, amount: data.cost } }}
	amount={data.cost || 0}
	currency="NGN"
	button_props={{}}>Click here to pay for access to this post</Paystack
>
