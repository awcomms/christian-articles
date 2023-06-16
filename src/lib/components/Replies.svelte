<script lang="ts">
	import { page } from '$app/stores';
	import type { Post, PostEntry, RedisKey } from '$lib/types';
	import { Button, ButtonSet, InlineLoading, Modal } from 'carbon-components-svelte';
	import Reply from 'carbon-icons-svelte/lib/Reply.svelte';
	import Context from './Context.svelte';
	import axios from 'axios';
	import Search from './Search.svelte';
	import Edit from '$lib/components/Edit/Edit.svelte';

	let id: RedisKey, posts: PostEntry[], totalItems: number, select_open = false, loading = false, selected: RedisKey[] = [], new_open=false, select_cta="Select articles to add as replies", create_cta="Create a new article to add as a reply";
	export { posts as documents, totalItems as total };
	
	const reply = async () => await axios.post(`/post/${id}/add_replies`, selected);

	const new_reply = (post: Post) => {
		axios.post('/post', post).then(r => {
			axios.post(`post/${r.data}/reply`, [id])
		})
	}
</script>

{#if $page.data.session?.user}
	<Modal
		bind:open={select_open}
		modalHeading={select_cta}
		primaryButtonText="Reply"
		secondaryButtonText="Cancel"
		primaryButtonIcon={loading ? InlineLoading : Reply}
		on:click:button--secondary={() => (select_open = false)}
		on:click:button--primary={() => {
			loading = true;
			reply().finally(() => (loading = false));
		}}
		hasScrollingContent
	>
		<Search select bind:selected />
	</Modal>
	<Modal
		bind:open={new_open}
		modalHeading={create_cta}
		passiveModal
		hasForm
		hasScrollingContent
>
	<Edit on:accept={({detail})=>new_reply(detail)} />
</Modal>

<ButtonSet stacked>
	<Button on:click={()=>select_open = true}>{select_cta}</Button>
	<Button on:click={()=>select_open = true}>{create_cta}</Button>
</ButtonSet>
{/if}


<Context {posts} {totalItems} />
