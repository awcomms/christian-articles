// import { collection } from './collection';
import { collections } from './mongodb';

export const find = async ({ page }: { page: number }) => {
	const results = await collections.posts.find();
	return results
		.sort({ created: -1 })
		.skip(page > 1 ? (page - 1) * 7 : 0)
		.limit(7)
		.toArray();
};
