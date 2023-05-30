import { posts_index_name } from '$lib/constants';
import type { V } from '$lib/types';
import { SchemaFieldTypes, VectorAlgorithms, createClient } from 'redis';

export const client = createClient({
	password: 'h0IMDCuVEsLqOLEOA3ge10gdhqLAjOqc',
	socket: {
		host: 'redis-14641.c265.us-east-1-2.ec2.cloud.redislabs.com',
		port: 14641
	}
});

await client.connect();

export const float32Buffer = (arr: V): Buffer => {
	return Buffer.from(new Float32Array(arr).buffer);
};

try {
	await client.ft.create(
		posts_index_name,
		{
			v: {
				type: SchemaFieldTypes.VECTOR,
				ALGORITHM: VectorAlgorithms.HNSW,
				TYPE: 'FLOAT32',
				DIM: 1536,
				DISTANCE_METRIC: 'COSINE'
			},
			user_email_escaped: {
				type: SchemaFieldTypes.TEXT
			}
		},
		{
			PREFIX: posts_index_name
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
