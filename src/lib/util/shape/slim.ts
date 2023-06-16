import type { RedisCommandArguments } from '@redis/client/dist/lib/commands';
export const slim = (obj: RedisCommandArguments): Record<string, any> => {
	if (!obj) return obj;
	return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
		const sub_keys = key.split('.');
		const last_key = sub_keys.pop();
		if (last_key) acc[last_key] = obj[key][0];
		return acc;
	}, {});
};
