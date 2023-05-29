<script lang="ts">
	import type { PageData } from './$types';
	import Edit from '$lib/components/Edit.svelte';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';

	export let data: PageData;

	let loading = false;

	const edit = (e: CustomEvent) => {
		loading = true;
		axios
			.post('/v', e.detail)
			.then(async ({ data: v }) => {
				await axios
					.post('/edit', { ...e.detail, v, last_modified: new Date() })
					.then((r) => notify('Edit saved'))
					.catch((e) => notify(`Error encountered ${e}`));
			})
			.catch((e) => notify(`Error encountered ${e}`))
			.finally(() => (loading = false));
	};
</script>

<Edit disabled={loading} on:accept={edit} post={data.post} />
