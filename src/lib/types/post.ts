import type { RedisKey } from '.';

export interface Subscription {
	required: boolean;
	duration: number;
	once: boolean;
	cost: number;
	self: boolean;
}

export interface Post {
	id: RedisKey;
	created: Date;
	updated: Date;
	user_name: string;
	user_email: string;
	allow_replies: boolean;
	subscription: Subscription;
	name: string;
	body: string;
	edit?: Edit;
	subscription_expires: number | 'never'
}

export interface Edit {
	id: number;
	to: RedisKey;
	date: Date;
	current: number;
}
