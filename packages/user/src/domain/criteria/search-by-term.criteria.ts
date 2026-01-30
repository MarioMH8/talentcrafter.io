import type { Nullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';

export default class SearchUserByTermCriteria {
	readonly skip: number;
	readonly take: number;
	readonly term?: Nullable<string>;

	constructor({ skip, take, term }: Primitives<SearchUserByTermCriteria>) {
		this.take = take;
		this.skip = skip;
		this.term = term;
	}
}
