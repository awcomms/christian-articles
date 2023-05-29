<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Edit from '$lib/components/Edit.svelte';
	import { notify } from '$lib/util/notify';
	import axios from 'axios';
	import { InlineLoading } from 'carbon-components-svelte';

	let loading = false;

	const add = (e: CustomEvent) => {
		if (!$page.data.session?.user?.email) {
			return goto('/auth');
		}
		loading = true;
		axios
			.post('/v', e.detail)
			.then(async ({ data: v }) => {
				await axios
					.post('/add', {
						...e.detail,
						v,
						user: $page.data.session.user.email,
						created: new Date()
					})
					.then((r) => goto(`${r.data.insertedId}`))
					.catch((e) => notify(`Error encountered ${e}`));
			})
			.catch((e) => notify(`Error encountered ${e}`))
			.finally(() => (loading = false));
	};
</script>

{#if loading}
	<InlineLoading />
{/if}
<Edit disabled={loading} on:accept={add} />
