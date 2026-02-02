import { FindUserByEmailCriteria } from '@talentcrafter/user/domain';
import { FindUserByEmailCriteriaMother, UserTermMother } from '@talentcrafter/user/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('FindUserByEmailCriteria', () => {
	test('should create a valid FindUserByEmailCriteria', () => {
		const criteria = FindUserByEmailCriteriaMother.random();
		expect(criteria).toBeInstanceOf(FindUserByEmailCriteria);
	});

	test('should create a FindUserByEmailCriteria with a specific email', () => {
		const email = UserTermMother.create('test@test.com').value;
		const criteria = FindUserByEmailCriteriaMother.create(email);
		expect(criteria.email.value).toBe(email);
	});
});
