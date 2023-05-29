<script lang="ts">
	import type { PageData } from './$types';
	import Edit from '$lib/components/Edit.svelte';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';

	export let data: PageData;

	let loading = false;

	const edit = async (e: CustomEvent) => {
		loading = true;
		await axios
			.post('/edit', { id: data.id, data: { ...e.detail, last_modified: Date.now() } })
			.then((r) => notify('Edit saved'))
			.catch((e) => notify(`Error encountered ${e}`))
			.finally(() => (loading = false));
	};
</script>

<Edit disabled={loading} on:accept={edit} post={data.post} />
