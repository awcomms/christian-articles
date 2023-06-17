<script lang="ts">
	import type { PageData } from './$types';
	import Edit from '$lib/components/Edit/Edit.svelte';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';
	import { goto } from '$app/navigation';
	import { client_delete } from '$lib/util/client_del';

	export let data: PageData;

	let save_loading = false,
		delete_loading = false;

	const del = async () => {
		delete_loading = true;
		await client_delete(data.id)
			.then((r) => {
				notify(`Post ${data.id} deleted`);
				goto('/');
			})
			.catch((e) => notify(`An error occured: ${e}`))
			.finally(() => (delete_loading = false));
	};

	const edit = async (e: CustomEvent) => {
		save_loading = true;
		await axios
			.put(`/post/${data.id}`, { id: data.id, data: { ...e.detail } })
			.then((r) => {
				console.log('tr', r.data);
				notify('Edit saved');
			})
			.catch((e) => {
				const error = e.response.data;
				console.log('e', error);
				notify(`An error occured: ${error}`);
			})
			.finally(() => (save_loading = false));
	};
</script>

<Edit
	id={data.id}
	{save_loading}
	{delete_loading}
	on:delete={del}
	on:accept={edit}
	post={data.post}
/>
