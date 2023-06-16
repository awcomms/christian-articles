<script lang="ts">
	import type { PostEntry, RedisKey } from '$lib/types';
	import axios from 'axios';
	import PostsPagination from './PostsPagination.svelte';
	import type { SearchResponse } from '$lib/types/SearchResponse';

	export let id: RedisKey,
		{ documents, total, page }: SearchResponse<PostEntry> = { documents: [], total: 0 };

	$: if (page) get(page);

	const get = async (page: number) => {
		({ documents, total } = await axios.post('/post/similar', { id, page }).then((r) => r.data));
	};
</script>

<PostsPagination posts={documents} totalItems={total} {page} />
