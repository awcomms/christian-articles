<script>
	import { SideNav, SideNavItems, SideNavMenu } from 'carbon-components-svelte';
	import SideNavLink from './SideNavLink.svelte';
	import { page } from '$app/stores';

	import { isSideNavOpen } from './store';

	import A2HsLink from './A2HSLink.svelte';
</script>

<SideNav bind:isOpen={$isSideNavOpen}>
	<SideNavItems>
		<SideNavLink text="Create a post" href="/post/add" />
		{#if $page.data.session?.user}
			<SideNavLink text="View your posts" href="/post/user/{$page.data.session?.user.email}" />
		{/if}
		<A2HsLink />
	</SideNavItems>
</SideNav>
