import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '$env/static/private';
import {  createClient } from 'redis';
import { setup } from './setup';

export const client = createClient({
	password: REDIS_PASSWORD,
	socket: {
		host: REDIS_HOST,
		port: Number(REDIS_PORT)
	}
});

await client.connect();
await setup()

export { exists } from './exists';
export { get } from './get';
export { json_array_index } from './json_array_index';
export { object_value } from './object_value';