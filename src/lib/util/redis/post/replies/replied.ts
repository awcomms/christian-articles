import { search, type SearchParams } from "$lib/util/redis/search";

export const replied = (params: SearchParams, id: string) => {
    if (!params.query) params.query = ''
    params.query += `@replies: {${id}}`
	return search(params);
};
