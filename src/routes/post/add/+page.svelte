<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Edit from '$lib/components/Edit/Edit.svelte';
	import { escape_email } from '$lib/util/escape_email';
	import { notify } from '$lib/util/notify';
	import axios from 'axios';

	let loading = false;

	const add = async (e: CustomEvent) => {
		if (!$page.data.session || !$page.data.session.user?.email) {
			// goto('/auth');
			notify(`You are not logged in, Please log in to continue this action`);
			return;
		}
		loading = true;
		await axios
			.post('/post', {
				...e.detail
			})
			.then(async (r) => {
				goto(`/post/${r.data}`);
			})
			.catch((e) => notify(`Error encountered ${e}`))
			.finally(() => (loading = false));
	};
</script>

<Edit save_loading={loading} on:accept={add} />
