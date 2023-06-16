import type { RedisCommandArguments } from '@redis/client/dist/lib/commands';
export const shape = (obj: RedisCommandArguments): Record<string, unknown> | undefined => {
	if (!obj) return obj;
	return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
		const keys = key.split('.');
		keys.shift();
		keys.reduce((ao, sub_key, index) => {
			if (index === keys.length - 1) {
				ao[sub_key] = obj[key];
			} else {
				if (!ao[sub_key]) {
					ao[sub_key] = {};
				}
			}
			return ao[sub_key];
		}, acc);
		return acc;
	}, {});
};