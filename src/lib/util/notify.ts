import { browser } from '$app/environment';

export const notify = (message: string) => {
	browser ? alert(message) : console.warn(message);
};
