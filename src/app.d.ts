// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { BeforeInstallPromptEvent } from "$lib/types";

declare global {
	interface WindowEventMap {
		beforeinstallprompt: BeforeInstallPromptEvent;
		appinstalled: Event
	}
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
