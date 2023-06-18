import { get } from '$lib/util/redis/get';
import type { RedisKey, UserPayment, Payment, EscapedEmail } from '$lib/types';

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

export const paid = async (email: EscapedEmail, id: RedisKey): Promise<boolean> => {
	const { payment } = await get<GetRes>(
		id,
		[`$.payment.users.${email.value}`, `$.payment.once`, `$.payment.duration`],
		false
	);
	if (!payment || !payment.users || !payment?.users[email.value]) return false
	const { date, paid_for_once } = payment.users[email.value];
	if (!date) return false;
	if (paid_for_once && payment.once) {
		return true;
	} else {
		return payment.duration + date > Date.now();
	} //TODO-let-it-be-fair
};
