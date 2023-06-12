import type { RedisId } from '$lib/types';
import { Tag, Text } from '$lib/types/filter';
import { search } from './search';

export const inRedisArray = (index: string, id_field: string, id: RedisId, array_field: string, value: string): Promise<number> => {
	return search({
		index,
		filters: [new Tag(array_field, [value]), new Text(id_field, id)],
		count: true
	}).then((r) => r.total);
};
