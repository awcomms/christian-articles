<script lang="ts">
	import Edit from '$lib/components/Edit/Edit.svelte';
	import axios from 'axios';
	import type { PageData } from './$types';
	import { notify } from '$lib/util/notify';

	export let data: PageData;

	const reply = async (e: CustomEvent) => {
		await axios.post('/post', e.detail).then(async ({data: id}) => {
			notify(`Successfully created new post`)
			await axios
				.post(`/post/${id}/reply`, [data.post.id])
				.then(() => notify(`Successfully replied to this post with newly created post`))
				.catch((e) =>
					notify({
						title: `An error occured replying to this post with newly created post`,
						subtitle: e.response.data, kind: 'error'
					})
				);
		});
	};
</script>

<Edit on:accept={reply} />
