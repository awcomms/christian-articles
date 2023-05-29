import cosine_similarity from 'compute-cosine-similarity';
import type { Embedding } from '$lib/types';
import { collections } from './mongodb';

export const search = async(embedding: Embedding) => {
	return await collections.posts.aggregate([
		{
			$addFields: {
				cosine_similarity: {
					$function: {
						body: (e: Embedding) => {
							return cosine_similarity(e, embedding);
						},
						args: ['$embedding'],
						lang: 'js'
					}
				}
            },
            $sort: { cosine_similarity: -1 }
		}
	]);
};
