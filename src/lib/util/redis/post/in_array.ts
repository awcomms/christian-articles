import type { RedisKey } from '$lib/types';
import { json_array_index } from '$lib/util/redis/json_array_index';

export const in_array = (id: RedisKey, path: string, value: string): Promise<boolean> => {
	return json_array_index(id, path, value).then((r) => {
		return r ? r > 0 : false;
	});
};
