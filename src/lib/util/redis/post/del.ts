import type { RedisKey } from '$lib/types';
import { notify } from '$lib/util/notify';
import axios from 'axios';

export const del = (id: RedisKey) => {
	axios
		.delete(`post/${id}`)
		.catch((e) => notify({ title: `Encountered an error deleting item: ${id}`, subtitle: e }));
};
