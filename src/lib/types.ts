import type { ObjectId } from 'mongodb';

type Outcome = 'accepted' | 'dismissed';
export interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<Outcome>;
	prompt(): Promise<{
		outcome: Outcome;
		platform: string;
	}>;
}
export interface Post {
	_id: ObjectId;
	created: Date;
	last_modified: Date;
	user: string;
	name: string;
	body: string;
	v: Embedding;
}

export type Embedding = number[];
