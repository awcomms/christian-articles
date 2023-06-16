type Outcome = 'accepted' | 'dismissed';
export interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<Outcome>;
	prompt(): Promise<{
		outcome: Outcome;
		platform: string;
	}>;
}

export type Email = string;
export type RedisKey = string;
export type NumberDate = number;

export type V = number[];

export type { SearchResponse } from './SearchResponse';
export type { Post, UserPayment, Payment, PostEdit, EditablePost, PostEntry, Edit } from './Post';
