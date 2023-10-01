import { search } from '$lib/util/redis/search';
import type { SearchParams } from '$lib/util/redis/search';

export const replies = (params: SearchParams, id: string) => {
	if (!params.query) params.query = '';
	params.query += `@replied: {${id}}`
	return search(params);
};
