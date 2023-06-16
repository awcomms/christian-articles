import { get } from '$lib/util/redis/get';
import { client } from '$lib/util/redis';
import { get_root_id } from './get_root_id';
import type { RedisJSON } from '@redis/json/dist//commands';
import type { UserPayment } from '$lib/types/Post';

export interface Args {
	email: string;
	id: string;
	once: boolean;
	amount: number;
	date: number;
}

export const record_payment = async ({
	email,
	id,
	amount,
	once: paid_for_once,
	date
}: Args): Promise<void> => {
	const root_post_id = await get_root_id(id);
	if (!root_post_id) throw `Encountered error getting root_post`;
	const { required, once } = await get<{ required: boolean; once: boolean }>(root_post_id, [
		'$.payment.required',
		'$.payment.once'
	]);
	if (!required) throw `Payment not required for ${id}`;
	const user_payment: UserPayment = { date, amount, paid_for_once, once };
	client.json.set(id, `$.payment.users.${email}`, { ...user_payment });
};
