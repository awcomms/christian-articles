<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Edit from '$lib/components/Edit.svelte';
	import { escape } from '$lib/util/escape';
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
		console.log($page.data.session.user);
		await axios
			.post('/post', {
				...e.detail,
				created: Date.now()
			})
			.then(async (r) => {
				console.log(r.data);
				goto(`/post/${r.data}`);
			})
			.catch((e) => notify(`Error encountered ${e}`))
			.finally(() => (loading = false));
	};
</script>

<Edit save_loading={loading} on:accept={add} />
