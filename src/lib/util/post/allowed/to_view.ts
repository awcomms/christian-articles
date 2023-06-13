import { get } from '$lib/util/get';
import { get_root_id } from '../get_root_id';
import { isUser } from '../isUser';

export const allowed = async (email: string, id: string): Promise<boolean> => {
	const root_id = await get_root_id(id);
	if (!root_id) throw `root article for ${id} not found`;
	if (await isUser(email, id)) return true;
	return await get<{ expires: number }>(id, [`$.subscriptions.${email}.expires`]).then(
		(r) => r.expires > Date.now()
	);
};
