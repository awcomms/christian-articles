<script>
	import { SideNav, SideNavItems } from 'carbon-components-svelte';
	import SideNavLink from './SideNavLink.svelte';
	import { page } from '$app/stores';

	import { isSideNavOpen } from './store';

	import A2HsLink from './A2HSLink.svelte';
</script>

<SideNav bind:isOpen={$isSideNavOpen}>
	<SideNavItems>
		<SideNavLink text="Create an article" href="/post/add" />
		{#if $page.data.session?.user}
			<SideNavLink text="View your articles" href="/post/user/{$page.data.session?.user.email}" />
		{/if}
		<A2HsLink />
	</SideNavItems>
</SideNav>
