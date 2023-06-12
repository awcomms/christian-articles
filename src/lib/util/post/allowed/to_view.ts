import { posts_index_name } from '$lib/constants';
import { SingleNumber, Tag } from '$lib/types/filter';
import { get } from '../../get';
import { search } from '../../search';
import { get_root_id } from '../get_root_id';
import { isUser } from '../isUser';

export const allowed = async (email: string, id: string): Promise<boolean> => {
	const root_id = await get_root_id(id);
	if (!root_id) throw `root article for ${id} not found`;
	if (await isUser(email, id)) return true;
	return await search({
		count: true,
		index: posts_index_name,
		filters: [new SingleNumber('current_version', 1), new Tag('subscribers', [email])]
	}).then((r) => Boolean(r.total));
};
