import { get } from '$lib/util/redis/get';
import { client } from '$lib/util/redis';
import { get_root_id } from './get_root_id';
import type { UserPayment } from '$lib/types/Post';
import type { EscapedEmail } from '$lib/types';

export type ArgsMetadata = Pick<Args, 'id' | 'once'>

export interface Args {
	email: EscapedEmail;
	date: number;
	id: string;
	once: boolean;
	cost: number;
}

export const record_payment = async ({
	email,
	id,
	cost,
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
	const user_payment: UserPayment = { date, cost, paid_for_once, once };
	client.json.set(id, `$.payment.users.${email.value}`, { ...user_payment });
};
