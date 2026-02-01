import { faker } from '@faker-js/faker';
import { UserPassword } from '@talentcrafter/user/domain';

export default class UserPasswordMother {
	static create(value?: string): UserPassword {
		if (value) {
			return new UserPassword(value);
		}
		/*
		 * Generate a password that meets the requirements:
		 * 1. At least 8 characters (we use 12 for safety)
		 * 2. Contains uppercase, lowercase, number, and special char
		 */
		const password = faker.internet.password({
			length: 12,
			memorable: false,
			pattern: /[A-Za-z0-9!@#$%^&*()_+]/,
			// Ensure all requirements are met at the start
			prefix: 'Aa1!',
		});

		return new UserPassword(password);
	}

	static random(): UserPassword {
		return this.create();
	}
}
