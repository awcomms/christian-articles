<script lang="ts">
	import type { PageData } from './$types';
	import Edit from '$lib/components/Edit/Edit.svelte';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';
	import { goto } from '$app/navigation';
	import { client_delete } from '$lib/util/client_del';
	import ConfirmDelete from '$lib/components/ConfirmDelete.svelte';

	export let data: PageData,
		delete_open = false;

	let save_loading = false,
		delete_loading = false;

	const del = async () => {
		delete_loading = true;
		await client_delete(data.id)
			.then((r) => {
				notify(`Post Successfully deleted`);
				goto('/');
			})
			.catch((e) =>
				notify({
					title: `Encountered an error attempting to delete ${data.id}`,
					subtitle: e.response.data,
					kind: 'error'
				})
			)
			.finally(() => (delete_loading = false));
	};

	const edit = async (e: CustomEvent) => {
		save_loading = true;
		await axios
			.put(`/post/${data.id}`, { id: data.id, data: { ...e.detail } })
			.then((r) => {
				notify('Edit saved');
			})
			.catch((e) => {
				notify({ title: `Encountered an error attempting to save the edit`, subtitle: e.reponse.data, kind: 'error' });
			})
			.finally(() => (save_loading = false));
	};
</script>

<ConfirmDelete id={data.id} name={data.post.name} bind:open={delete_open} on:accept={del} />

<Edit
	show_delete_button
	id={data.id}
	{save_loading}
	{delete_loading}
	on:delete={() => (delete_open = true)}
	on:accept={edit}
	post={data.post}
/>
