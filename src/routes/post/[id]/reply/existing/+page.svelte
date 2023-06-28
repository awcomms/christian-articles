<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import type { PostSearchDocument, RedisKey } from '$lib/types';
	import { notify } from '$lib/util/notify';
	import axios from 'axios';
	import { Button, Column, Row } from 'carbon-components-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let posts: PostSearchDocument[] = []

	// TODO let posts already replied to by this post already by seleceted

	const reply = async () => {
		const selected = posts.filter(p => p.selected).map(p => p.id)
		if (!selected.length) notify({title: 'No posts to reply to have been selected', kind: 'warning'});
		for (let id of selected) {
			await axios
				.post(`/post/${id}/reply`, [data.post.id])
				.then((r) => notify(`Successfully replied with ${id}`)) //TODO update UI or redirect to where?
				.catch((e) =>
					notify({ title: `Encountered and error attempting to reply with ${id}`, subtitle: e.response.data, kind: 'error' })
				);
		}
	};
</script>

<Row>
	<Column>
		<Button on:click={reply}>Reply to selected posts</Button>
		<Search bind:posts select />
	</Column>
</Row>
