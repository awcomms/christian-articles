import { count } from '$lib/util/count.js';
import { text } from '@sveltejs/kit';

export const GET = async () => {
	return text((await count()).toString());
};
