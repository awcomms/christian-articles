// import { Text } from "$lib/types/filter";
import { search, type PostSearchParams } from "$lib/util/redis/post/search";
import { Tag } from "$lib/types/filter";

export const replies = (params: PostSearchParams & {reference: string}) => {
    if (!Array.isArray(params.filters)) params.filters = []
    params.filters.push(new Tag('replies', [params.reference]))
	return search(params);
};
