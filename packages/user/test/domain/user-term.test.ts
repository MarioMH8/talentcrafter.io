import { UserTerm } from '@talentcrafter/user/domain';
import { UserTermMother } from '@talentcrafter/user/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('UserTerm', () => {
	test('should create a valid UserTerm', () => {
		const value = UserTermMother.random();
		expect(value).toBeInstanceOf(UserTerm);
	});

	test('should create a UserTerm with a specific value', () => {
		const expectedValue = 'test@example.com';
		const userTerm = UserTermMother.create(expectedValue);
		expect(userTerm.value).toBe(expectedValue);
	});
});
