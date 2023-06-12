import type { RedisId } from ".";

export interface Subscription {
	required: boolean;
	duration: number;
	once: boolean;
	cost: number;
	self: boolean;
}

export interface Post {
	id: RedisId;
	created: Date;
	last_modified: Date;
	user_name: string;
	user_email: string;
	allow_replies: boolean;
	subscription: Subscription;
	name: string;
	body: string;
	edit?: Edit;
}

export interface Edit {
	id: number;
	to: RedisId;
	date: Date;
	current: number;
}
