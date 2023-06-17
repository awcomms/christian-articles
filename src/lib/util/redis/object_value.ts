import { get } from '$lib/util/redis';
import type { RedisKey } from '$lib/types';

export const object_value = <Value>(key: RedisKey, sub_path: string, value_key: string) =>
	get<Record<string, Value>>(key, [`$.${sub_path}.${value_key}`]).then((r) =>
		r && Object.hasOwn(r, value_key) ? r[value_key] : r
	);
