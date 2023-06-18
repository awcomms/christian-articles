import type { RedisKey } from '$lib/types';
import type { Filter, Filters } from '$lib/types/filter';
import { get } from '$lib/util/redis/get';
import { exists } from '$lib/util/redis/exists';
import { search } from './search';

export const similar = async ({
	id,
	page,
	filters
}: {
	id: RedisKey;
	page: number;
	filters?: Filters;
}) => {
	if (!(await exists(id))) return null;
	const { v } = await get<{ v: number[] }>(id, ['$.v']);
	return search({ search: v, page, filters });
};
