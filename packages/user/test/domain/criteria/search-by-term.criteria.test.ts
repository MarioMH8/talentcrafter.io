import { SearchUserByTermCriteria } from '@talentcrafter/user/domain';
import { SearchUserByTermCriteriaMother } from '@talentcrafter/user/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('SearchUserByTermCriteria', () => {
	test('should create a valid SearchUserByTermCriteria', () => {
		const criteria = SearchUserByTermCriteriaMother.random();
		expect(criteria).toBeInstanceOf(SearchUserByTermCriteria);
	});

	test('should create a SearchUserByTermCriteria with specific values', () => {
		const skip = 5;
		const take = 20;
		const term = 'search term';
		const criteria = SearchUserByTermCriteriaMother.create({ skip, take, term });

		expect(criteria.skip).toBe(skip);
		expect(criteria.take).toBe(take);
		expect(criteria.term).toBe(term);
	});
});
