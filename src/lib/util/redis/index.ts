import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '$env/static/private';
import { setup } from './setup';
import { createClient } from 'redis';

export const client = createClient({
	password: REDIS_PASSWORD,
	socket: {
		host: REDIS_HOST,
		port: Number(REDIS_PORT)
	}
});

client.on('error', (e) => console.error(e));

try {
	await client.connect();
} catch (e) {
	console.error(e);
}
await setup();
