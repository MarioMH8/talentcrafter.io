import { faker } from '@faker-js/faker';
import type { Primitives } from '@hexadrop/types/primitives';
import { SearchUserByTermCriteria } from '@talentcrafter/user/domain';

export default class SearchUserByTermCriteriaMother {
	static create({ skip, take, term }: Partial<Primitives<SearchUserByTermCriteria>> = {}): SearchUserByTermCriteria {
		return new SearchUserByTermCriteria({
			skip: skip ?? faker.number.int({ max: 10, min: 0 }),
			take: take ?? faker.number.int({ max: 100, min: 1 }),
			term: term ?? faker.word.sample(),
		});
	}

	static random(): SearchUserByTermCriteria {
		return this.create();
	}
}
