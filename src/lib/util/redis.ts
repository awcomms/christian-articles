import type { Embedding } from '$lib/types';
import { SchemaFieldTypes, VectorAlgorithms, createClient } from 'redis';

export const client = createClient({
	password: 'h0IMDCuVEsLqOLEOA3ge10gdhqLAjOqc',
	socket: {
		host: 'redis-14641.c265.us-east-1-2.ec2.cloud.redislabs.com',
		port: 14641
	}
});

await client.connect();

export const float32Buffer = (arr: Embedding): Buffer => {
	return Buffer.from(new Float32Array(arr).buffer);
};

try {
	await client.ft.create(
		'posts',
		{
			v: {
				type: SchemaFieldTypes.VECTOR,
				ALGORITHM: VectorAlgorithms.HNSW,
				TYPE: 'FLOAT32',
				DIM: 1536,
				DISTANCE_METRIC: 'COSINE'
			}
		},
		{
			PREFIX: 'post'
		}
	);
} catch (e) {
	if (e.message === 'Index already exists') {
		console.log('Index already exists, skipped creation');
	} else {
		console.error(e);
		process.exit(1);
	}
}
