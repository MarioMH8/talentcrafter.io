import { faker } from '@faker-js/faker';
import { UserEmail } from '@talentcrafter/user/domain';

export default class UserEmailMother {
	static create(value?: string): UserEmail {
		return new UserEmail(value ?? faker.internet.email());
	}

	static random(): UserEmail {
		return this.create();
	}
}
