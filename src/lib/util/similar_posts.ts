import type { AggregationCursor } from 'mongodb';
import { search } from './search';
import { collection } from './collection';

export const similar_posts = async ({
	id,
	page
}: {
	id: string;
	page: number;
}): Promise<AggregationCursor> => {
	return await collection.findOne({ id }).then(async (d) => {
		if (!d) {
			throw `Post ${id} not found`;
		}
		return search(await collection, d.embedding)
			.skip(page * 7)
			.limit(7);
	});
};
