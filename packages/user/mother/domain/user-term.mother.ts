import { faker } from '@faker-js/faker';
import { UserTerm } from '@talentcrafter/user/domain';

export default class UserTermMother {
	static create(value?: string): UserTerm {
		return new UserTerm(value ?? faker.internet.username());
	}

	static random(): UserTerm {
		return this.create();
	}
}
