import { get } from '$lib/util/redis/get';
import type { RedisKey, Email, UserPayment, Payment } from '$lib/types';

interface GetRes {
	payment: PaymentRes;
	users: Users;
}

type PaymentRes = Pick<Payment, 'once' | 'duration'> & {
	users: Users
};
interface Users {
	[email: string]: UserPayment;
}

export const paid = async (email: Email, id: RedisKey): Promise<boolean> => {
	const { payment } = await get<GetRes>(
		id,
		[`$.payment.users.${email}`, `$.payment.once`, `$.payment.duration`],
		false
	);
	if (!payment || !payment.users || !payment?.users[email]) return false
	const { date, paid_for_once } = payment.users[email];
	if (!date) return false;
	if (paid_for_once && payment.once) {
		return true;
	} else {
		return payment.duration + date > Date.now();
	} //TODO-let-it-be-fair
};
