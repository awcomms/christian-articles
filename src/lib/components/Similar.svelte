<script lang="ts">
	import type { PostSearchDocument, PostItem, RedisKey } from '$lib/types';
	import axios from 'axios';
	import PostsPagination from './PostsPagination.svelte';
	import type { SearchResponse } from '$lib/types/SearchResponse';

	export let id: RedisKey,
		{ documents, total, page }: SearchResponse<PostItem> = { documents: [], total: 0, page: 1 };

	$: if (page) get(page);

	const get = async (page: number) => {
		({ documents, total } = await axios.post('/post/similar', { id, page }).then((r) => r.data));
	};
</script>

<PostsPagination posts={documents} totalItems={total} {page} />
