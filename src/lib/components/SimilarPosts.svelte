<script lang="ts">
	import type { PostEntry, RedisKey } from '$lib/types';
	import axios from 'axios';
	import PostsPagination from './PostsPagination.svelte';

	export let id: RedisKey, posts: PostEntry[], totalItems: number, page: number;

	$: get(page);

	const get = async (page: number) => {
		({ documents: posts, total: totalItems } = await axios
			.post('/post/similar', { id, page })
			.then((r) => r.data));
	};
</script>

<PostsPagination {posts} {totalItems} {page} />
