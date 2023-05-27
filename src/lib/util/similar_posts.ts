import type { AggregationCursor } from 'mongodb';
import { search } from './search';
import { collections } from './mongodb';

export const similar_posts = async ({
	id,
	page
}: {
	id: string;
	page: number;
}): Promise<AggregationCursor> => {
	return await collections.posts.findOne({ id }).then(async (d) => {
		if (!d) {
			throw `Post ${id} not found`;
		}
		const results = await search(d.embedding);
		return results.skip(page > 1 ? (page - 1) * 7 : 0).limit(7);
	});
};
