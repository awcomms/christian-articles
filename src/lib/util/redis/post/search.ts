import type { SearchParams } from '$lib/util/redis/search';
import { search as _search } from '$lib/util/redis/search';
import { posts_index_name } from '$lib/constants';
import type { PostItem, RedisKey, SearchResponse } from '$lib/types';

export type PostSearchParams = Omit<SearchParams, 'index' | 'page'> & Partial<Pick<SearchParams, 'page' | 'RETURN'>>;

export interface ExtraPostSearchParams extends PostSearchParams {
	email?: string;
	reference?: RedisKey;
}

export const search = ({
	page = 1,
	filters: _filters,
	count,
	search,
	RETURN = ['$.name', '$.body', '$.id', '$.creator', '$.is_root']
}: // reference TODO?
ExtraPostSearchParams) => {
	const filters = _filters ? _filters : [];
	filters.push({ type: 'bool', field: 'is_root', value: true });
	// if (reference) {
	// 	RETURN.push(`$.replies.${reference} AS in_replies`);
	// 	RETURN.push(`$.replied.${reference} AS in_replied`);
	// }
	return _search({
		page,
		filters,
		count,
		index: posts_index_name,
		search,
		RETURN
	}) as Promise<SearchResponse<PostItem>>;
};
