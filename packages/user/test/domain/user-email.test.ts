import { UserEmail, UserEmailError } from '@talentcrafter/user/domain';
import { UserEmailMother } from '@talentcrafter/user/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('UserEmail', () => {
	test('should create a valid UserEmail', () => {
		const value = UserEmailMother.random();
		expect(value).toBeInstanceOf(UserEmail);
	});

	test('should create a UserEmail with a specific value', () => {
		const expectedValue = 'test@example.com';
		const userEmail = UserEmailMother.create(expectedValue);
		expect(userEmail.value).toBe(expectedValue);
	});

	test('should throw error if email is empty', () => {
		expect(() => new UserEmail('')).toThrow(UserEmailError);
	});

	test('should throw error if email has not correct format', () => {
		const incorrect = 'testexample.com';
		expect(() => new UserEmail(incorrect)).toThrow(UserEmailError);
	});
});
