<script lang="ts">
	import { goto } from '$app/navigation';
	import Edit from '$lib/components/Edit.svelte';
	import axios from 'axios';

	const add = async (e: CustomEvent) => {
		await axios.post('/add', e.detail).then((r) => goto(`${r.data.insertedId}`));
	};
</script>

<Edit on:save={add} />
