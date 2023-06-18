<script lang='ts'>
	import Replies from '$lib/components/Replies.svelte';
	import type { PageData } from './$types';

	export let data: PageData
</script>

<Replies {...data.props}/>