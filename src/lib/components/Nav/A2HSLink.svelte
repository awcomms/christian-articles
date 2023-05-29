<script lang="ts">
	import type { BeforeInstallPromptEvent } from '$lib/types';
	import SideNavLink from './SideNavLink.svelte';
	import { showA2HS } from './store';

	// let installPrompt: BeforeInstallPromptEvent;

	// const installed = () => {
	// 	$showA2HS = false;
	// };

	// const before = (e) => {
	// 	$showA2HS = true;
	// 	e.preventDefault();
	// 	installPrompt = e;
	// };

	const install = () => {
		// installPrompt.prompt();
		// installPrompt.userChoice.then((choice) => {
		// 	if (choice === 'accepted') {
		// 		$showA2HS = false;
		// 	}
		// });
	};
</script>

<!-- <svelte:window on:appinstalled={installed} on:beforeinstallprompt={before} /> -->

{#if $showA2HS}
	<SideNavLink on:click={install} href={null} text="Add To Homescreen" />
{/if}
