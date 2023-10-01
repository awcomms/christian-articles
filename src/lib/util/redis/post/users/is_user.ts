import type { EscapedEmail, RedisKey } from '$lib/types';
import { client } from '../..';

export const is_user = async (id: RedisKey, email: EscapedEmail) =>
	client.json.arrIndex(id, 'users', email.value) ?? undefined
