import { get_root_id } from '$lib/util/redis/post/get_root_id';
import { is_user } from '$lib/util/redis/post/users/is_user';
import { paid } from '$lib/util/redis/post/paid';
import type { EscapedEmail } from '$lib/types';
import { requires_payment } from '../requires_payment';

export const allowed_to_view = async (email: EscapedEmail, id: string): Promise<boolean> => {
	const root_id = await get_root_id(id);
	if (!root_id) throw `root article for ${id} not found`;
	if (await is_user(id, email)) return true;
	return await requires_payment(id) ? await paid(email, id): true;
};
