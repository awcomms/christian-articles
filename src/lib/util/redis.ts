import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '$env/static/private';
import { posts_index_name } from '$lib/constants';
import type { V } from '$lib/types';
import { SchemaFieldTypes, VectorAlgorithms, createClient } from 'redis';

export const client = createClient({
	password: REDIS_PASSWORD,
	socket: {
		host: REDIS_HOST,
		port: Number(REDIS_PORT)
	}
});

await client.connect();

export const float32Buffer = (arr: V): Buffer => {
	return Buffer.from(new Float32Array(arr).buffer);
};

try {
	await client.ft.dropIndex(posts_index_name);
	await client.ft.create(
		posts_index_name,
		{
			'$.v': {
				AS: 'v',
				type: SchemaFieldTypes.VECTOR,
				ALGORITHM: VectorAlgorithms.HNSW,
				TYPE: 'FLOAT32',
				DIM: 1536,
				DISTANCE_METRIC: 'COSINE'
			},
			'$.name': {
				AS: 'name',
				type: SchemaFieldTypes.TEXT
			},
			'$.subscription.required': {
				AS: 'subscription_required',
				type: SchemaFieldTypes.NUMERIC,
				SORTABLE: true,
				NOINDEX: true
			},
			'$.replies': {
				AS: 'replies',
				type: SchemaFieldTypes.TAG,
				SEPARATOR: ';'
			},
			'$.id': {
				AS: 'id',
				type: SchemaFieldTypes.TEXT
			},
			'$.created': {
				AS: 'created',
				type: SchemaFieldTypes.NUMERIC
			},
			'$.users': {
				AS: 'users',
				type: SchemaFieldTypes.TAG,
				SEPARATOR: ';'
			},
			'$.verion.current': {
				AS: 'current_version',
				type: SchemaFieldTypes.NUMERIC,
				SORTABLE: true,
				NOINDEX: true
			},
			'$.edit.to': {
				AS: 'edit_to',
				type: SchemaFieldTypes.TEXT
			},
			'$.creator': {
				AS: 'creator',
				type: SchemaFieldTypes.TEXT
			},
			'$.allow_replies': {
				AS: 'allow_replies',
				type: SchemaFieldTypes.NUMERIC,
				SORTABLE: true,
				NOINDEX: true
			},
			'$.allow_user_replies': {
				AS: 'allow_user_replies',
				type: SchemaFieldTypes.NUMERIC,
				SORTABLE: true,
				NOINDEX: true
			},
			'$.allow_self_replies': {
				AS: 'allow_self_replies',
				type: SchemaFieldTypes.NUMERIC,
				SORTABLE: true,
				NOINDEX: true
			},
			'$.replied': {
				AS: 'replied',
				type: SchemaFieldTypes.TAG,
				SEPARATOR: ';'
			}
		},
		{
			ON: 'JSON',
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
