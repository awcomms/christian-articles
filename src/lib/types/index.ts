import type { Post } from './post';

type Outcome = 'accepted' | 'dismissed';
export interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<Outcome>;
	prompt(): Promise<{
		outcome: Outcome;
		platform: string;
	}>;
}

export type CountId = number;
export type RedisKey = string;

export interface PostEntry {
	id: string;
	value: Post;
}

export type V = number[];
export type { Post as Post } from './post';
