<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import Post from '$lib/components/Post.svelte';
</script>

<Post post={data.post} />
