import cosine_similarity from 'compute-cosine-similarity';
import type { Embedding } from '$lib/types';
import { collection } from '$lib/collection';

export const search = (embedding: Embedding) => {
	return collection.aggregate([
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
