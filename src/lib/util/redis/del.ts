import { client } from '$lib/util/redis';

export const del = (id: string) => client.del(id);
