import { SingleNumber, Text } from '$lib/types/filter';
import { get_root_id } from './get_root_id';
import { search } from './search';

export const get_current_version_id = async (id: string) => {
	const root_id = await get_root_id(id);
	if (!root_id) throw `Did not find root of ${id}`;
	return search({
		filters: [new Text('edit_to', root_id), new SingleNumber('current_version', 1)]
	}).then((r) => {
		if (!r.total) throw `current_version_id for ${id} not found`;
		if (r.total > 1) console.error(`more than one result for current_version_id for ${id}`);
		return r.documents[0].id;
	});
};
