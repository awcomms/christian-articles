import type { RedisKey } from '$lib/types';
import { client } from '.';

export const exists = (id: RedisKey) => client.exists(id);
