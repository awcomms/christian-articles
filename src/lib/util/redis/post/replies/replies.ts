// import { Text } from "$lib/types/filter";
import { search, type PostSearchParams } from '$lib/util/redis/post/search';

export const replies = (params: PostSearchParams & { reference: string }) => {
	if (!Array.isArray(params.filters)) params.filters = [];
	params.filters.push({ type: 'tag', field: 'replies', values: [params.reference] });
	return search(params);
};
