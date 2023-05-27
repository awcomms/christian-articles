import { collections } from '$lib/util/mongodb';
import { text } from '@sveltejs/kit';

export const GET = async () => {
	return text(String(await collections.posts.countDocuments()));
};
