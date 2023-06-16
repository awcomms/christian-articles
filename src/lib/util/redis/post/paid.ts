import { get } from '$lib/util/redis/get';
import type { RedisKey, Email, UserPayment, Payment } from '$lib/types';

interface GetRes {
	payment: PaymentRes;
	users: Users;
}

type PaymentRes = Pick<Payment, 'once' | 'duration'>;
interface Users {
	[email: string]: UserPayment;
}

export const paid = async (email: Email, id: RedisKey): Promise<boolean> => {
	const { payment, users } = await get<GetRes>(
		id,
		[`$.payment.users.${email}`, `$.payment.once`, `.payment.duration`],
		false
	);
	const { date, once } = users[email];
	if (!date) return false;
	if (once) {
		return true;
	} else {
		return payment.duration + date > Date.now();
	} //TODO-let-it-be-fair
};
