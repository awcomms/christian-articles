import type { SearchParams } from '../search';
import { search as _search } from '$lib/util/redis/search';
import { posts_index_name } from '$lib/constants';
import type { PostEntry, RedisKey } from '$lib/types';
import { Text } from '$lib/types/filter';

export type PostSearchParams = Omit<SearchParams, 'index' | 'RETURN'>;

export interface ExtraPostSearchParams extends PostSearchParams {
	email?: string;
	reference?: RedisKey;
}

export const search = ({ page, filters: _filters, count, search, reference }: ExtraPostSearchParams) => {
	const RETURN = ['$.name', '$.body', '$.id', '$.creator'];
	// if (email) filters.push(new NumberRange(`$.payment.users.${email}.date`, ["-inf", ])) // RETURN.push(`$.payment.users.${email}.expires AS payment_expires`);
	const filters = _filters ? _filters : [];
	filters.push(new Text('current_version', 'true'));
	if (reference) RETURN.push(`$.replies.${reference} AS in_replies`);
	if (reference) RETURN.push(`$.replied.${reference} AS in_replied`);
	return _search<PostEntry>({ page, filters, count, index: posts_index_name, search, RETURN });
};
