import { faker } from '@faker-js/faker';
import { UserUsernameOrEmail } from '@talentcrafter/user/domain';

export default class UserUsernameOrEmailMother {
	static create(value?: string): UserUsernameOrEmail {
		return new UserUsernameOrEmail(value ?? faker.internet.username());
	}

	static random(): UserUsernameOrEmail {
		return this.create();
	}
}
