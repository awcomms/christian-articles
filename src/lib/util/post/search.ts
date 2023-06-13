import type { SearchParams } from '../search';
import { search as _search } from '$lib/util/search';
import { posts_index_name } from '$lib/constants';
import type { PostEntry, RedisKey } from '$lib/types';

export interface PostSearchParams extends Omit<SearchParams, 'index' | 'RETURN'> {
	email?: string;
	replied?: RedisKey
}

export const search = ({ page, filters, count, search, email, replied }: PostSearchParams) => {
	const RETURN = ['$.name', '$.body', '$.id', '$.creator'];
	if (email) RETURN.push(`$.subscriptions.${email}.expires AS subscription_expires`);
	if (replied) RETURN.push(`$.replies.${replied} AS replied`)
	return _search<PostEntry>({ page, filters, count, index: posts_index_name, search, RETURN });
};
