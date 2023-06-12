import { posts_index_name } from "$lib/constants";
import type { RedisId } from "$lib/types";
import { Tag, Text } from "$lib/types/filter";
import { search } from "../search";

export const isUser = (email: RedisId, id: RedisId) => {
	return search({
		index: posts_index_name,
		filters: [new Tag('users', [email]), new Text('id', id)]
	}).then((r) => r.total);
};
