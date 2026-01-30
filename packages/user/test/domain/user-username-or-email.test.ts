import { UserUsernameOrEmail } from '@talentcrafter/user/domain';
import { UserUsernameOrEmailMother } from '@talentcrafter/user/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('UserUsernameOrEmail', () => {
	test('should create a valid UserUsernameOrEmail', () => {
		const value = UserUsernameOrEmailMother.random();
		expect(value).toBeInstanceOf(UserUsernameOrEmail);
	});

	test('should create a UserUsernameOrEmail with a specific value', () => {
		const expectedValue = 'test@example.com';
		const userUsernameOrEmail = UserUsernameOrEmailMother.create(expectedValue);
		expect(userUsernameOrEmail.value).toBe(expectedValue);
	});
});
