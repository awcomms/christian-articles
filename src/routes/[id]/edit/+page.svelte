<script lang="ts">
	import type { PageData } from './$types';
	import Edit from '$lib/components/Edit.svelte';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';
	import { goto } from '$app/navigation';
	import { client_delete } from '$lib/util/client_del';

	export let data: PageData;

	let loading = false;

	const del = async () => {
		await client_delete(data.id)
			.then((r) => {
				notify(`Post ${data.id} deleted`);
				goto('/');
			})
			.catch((e) => notify(`An error occured: ${e}`));
	};

	const edit = async (e: CustomEvent) => {
		loading = true;
		await axios
			.post(`/${data.id}/edit`, { id: data.id, data: { ...e.detail, last_modified: Date.now() } })
			.then((r) => notify('Edit saved'))
			.catch((e) => notify(`An error occured: ${e}`))
			.finally(() => (loading = false));
	};
</script>

<Edit id={data.id} disabled={loading} on:delete={del} on:accept={edit} post={data.post} />
