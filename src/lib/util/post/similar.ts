import type { RedisKey } from '$lib/types';
import type { Filter } from '$lib/types/filter';
import { get } from '../get';
import { exists } from '../redis/exists';
import { search } from './search';

export const similar = async ({
	id,
	page,
	filters
}: {
	id: RedisKey;
	page: number;
	filters?: Filter[];
}) => {
    if (!(await exists(id))) return null;
    const {v} = await get<{v: Buffer}>(id, ['$.v'])
	return search({ search: v, page, filters });
};
