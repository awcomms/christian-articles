import type { GoogleProfile } from '@auth/core/providers/google';

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
	created: Date;
	last_modified: Date;
	user: Pick<GoogleProfile, 'name' | 'email'>;
	name: string;
	body: string;
}

export interface PostEntry {
	id: string;
	value: Post;
}

export type V = number[];
