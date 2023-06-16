import { get_root_id } from '../get_root_id';
import { is_user } from '$lib/util/redis/post/users/is_user';
import { paid } from '$lib/util/redis/post/paid';

export const allowed_to_view = async (email: string, id: string): Promise<boolean> => {
	const root_id = await get_root_id(id);
	if (!root_id) throw `root article for ${id} not found`;
	if (await is_user(email, id)) return true;
	return await paid(email, id);
};
