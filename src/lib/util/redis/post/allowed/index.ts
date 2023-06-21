import { get_root_id } from '$lib/util/redis/post/get_root_id';
import { is_user } from '$lib/util/redis/post/users/is_user';
import { paid } from '$lib/util/redis/post/paid';
import type { EscapedEmail } from '$lib/types';
import { requires_payment } from '../requires_payment';
import { get } from '$lib/util/redis/get';

export const allowed = async (email: EscapedEmail | null, id: string): Promise<boolean> => {
	const { is_root, edits } = await get<{ is_root: boolean; edits: boolean }>(id, [
		'$.is_root',
		'$.payment.edits'
	]);
	if (!is_root && !edits) return true;
	return (await requires_payment(id))
		? email
			? (await is_user(id, email))
				? true
				: await paid(email, id)
			: false
		: true;
};
