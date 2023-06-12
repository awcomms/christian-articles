import type { RedisId } from '$lib/types';
import type { Edit } from '$lib/types/post';
import { get } from '../get';

export const get_root_id = async (id: string): Promise<RedisId | null> =>
	get<{edit: Edit}>(id, ['$.edit.to']).then((r) => r.edit.to);
