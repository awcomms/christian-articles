import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ObjectId } from 'mongodb';
import { collections } from '$lib/util/mongodb';
import { search } from '$lib/util/_search';

export const POST = (async ({ request }) => {
	const { id, page } = await request.json();
	const _id = new ObjectId(id);
	const result = await collections.posts.findOne({ _id });
	if (!result) {
		throw error(404, `Post ${_id} not found`);
	}
	const results = await search(result.v);
	return json(
		results
			.skip(page > 1 ? (page - 1) * 7 : 0)
			.limit(7)
			.toArray()
	);
}) satisfies RequestHandler;
