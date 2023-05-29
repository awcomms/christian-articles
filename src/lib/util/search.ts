import { embedding_field_name } from '$lib/constants';
import type { V } from '$lib/types';
import { client, float32Buffer } from './redis';

export const search = ({ index, v }: { index: string; v: V }) => {
	return client.ft.search(index, `*=>[KNN 7 @${embedding_field_name} $BLOB`, {
		PARAMS: {
			BLOB: float32Buffer(v)
		},
		SORTBY: `__${embedding_field_name}_score`,
		DIALECT: 2
	});
};
