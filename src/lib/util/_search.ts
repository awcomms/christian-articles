import cosine_similarity from 'compute-cosine-similarity';
import type { Embedding } from '$lib/types';
import { collections } from './mongodb';

export const search = async (v: Embedding) => {
	return await collections.posts.aggregate([
		{
			$addFields: {
				cosine_similarity: {
					$function: {
						body: (e: Embedding) => {
							return cosine_similarity(e, v);
						},
						args: ['$v'],
						lang: 'js'
					}
				}
			},
			$sort: { cosine_similarity: -1 }
		}
	]);
};
