import { browser } from '$app/environment';
import { arrayStore } from '$lib/util/store';
import type { ToastNotificationProps } from 'carbon-components-svelte/types/Notification/ToastNotification.svelte';

export const notify = (message: string | ToastNotificationProps) => {
	if (browser) {
		const n: ToastNotificationProps = typeof message === 'string' ? { title: message } : message;
		n.caption = new Date().toLocaleString();
		if (!n.timeout) n.timeout = 3700
		n.kind = 'success'
		n.lowContrast = true
		notifications.update((ns) => [...ns, n]);
	}
};

export const notifications = arrayStore<ToastNotificationProps>('notifications');
