<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Edit from '$lib/components/Edit.svelte';
	import { notify } from '$lib/util/notify';
	import axios from 'axios';
	import { InlineLoading } from 'carbon-components-svelte';

	let loading = false;

	const add = async (e: CustomEvent) => {
		if (!$page.data.session || !$page.data.session.user) {
			goto('/auth');
			return;
		}
		loading = true;
		console.log(e.detail, $page.data.session.user);
		await axios
			.post('/add', {
				...e.detail,
				user: {email: $page.data.session.user.email, name: $page.data.session.user.name},
				created: Date.now()
			})
			.then(async (r) => {
				console.log(r.data);
				goto(`/${r.data}`);
			})
			.catch((e) => notify(`Error encountered ${e}`))
			.finally(() => (loading = false));
	};
</script>

{#if loading}
	<InlineLoading />
{/if}
<Edit disabled={loading} on:accept={add} />
