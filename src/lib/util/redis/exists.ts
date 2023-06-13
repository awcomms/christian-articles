import type { RedisKey } from '$lib/types';
import { client } from '../redis';

export const exists = (id: RedisKey) => client.exists(id);