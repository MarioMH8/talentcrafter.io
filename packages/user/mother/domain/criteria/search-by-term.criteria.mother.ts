import { faker } from '@faker-js/faker';
import type { Primitives } from '@hexadrop/types/primitives';
import { SearchUserByTermCriteria } from '@talentcrafter/user/domain';

export default class SearchUserByTermCriteriaMother {
	static create(
		{ skip, take, term }: Partial<Primitives<SearchUserByTermCriteria>> = {}
	): SearchUserByTermCriteria {
		return new SearchUserByTermCriteria({
			skip: skip ?? faker.number.int({ min: 0, max: 10 }),
			take: take ?? faker.number.int({ min: 1, max: 100 }),
			term: term ?? faker.word.sample(),
		});
	}

	static random(): SearchUserByTermCriteria {
		return this.create();
	}
}
