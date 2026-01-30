import { FindUserByUsernameCriteria } from '@talentcrafter/user/domain';
import { FindUserByUsernameCriteriaMother, UserUsernameOrEmailMother } from '@talentcrafter/user/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('FindUserByUsernameCriteria', () => {
	test('should create a valid FindUserByUsernameCriteria', () => {
		const criteria = FindUserByUsernameCriteriaMother.random();
		expect(criteria).toBeInstanceOf(FindUserByUsernameCriteria);
	});

	test('should create a FindUserByUsernameCriteria with a specific username', () => {
		const username = UserUsernameOrEmailMother.create('username').value;
		const criteria = FindUserByUsernameCriteriaMother.create(username);
		expect(criteria.username.value).toBe(username);
	});
});
