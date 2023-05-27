import { MONGO_USER_PASSWORD } from '$env/static/private';
import type { Post } from '$lib/types';
import { MongoClient } from 'mongodb';

const client = new MongoClient(`mongodb+srv://gold67379:${MONGO_USER_PASSWORD}@call.arg4uux.mongodb.net/`);
export const connectPromise = client.connect().catch(console.error);
const db = client.db('call');

const posts = db.collection<Post>('posts');

export { client, db };

export const collections = { posts };
