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
	user: string;
	name: string;
	body: string;
	id: string;
	embedding: Embedding;
}

export type Embedding = Array<number>;
