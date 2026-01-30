import { TalentCrafterIdMother } from '@talentcrafter/aggregate-root/mother/domain';
import { FindUserByIdCriteria } from '@talentcrafter/user/domain';
import { FindUserByIdCriteriaMother } from '@talentcrafter/user/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('FindUserByIdCriteria', () => {
	test('should create a valid FindUserByIdCriteria', () => {
		const criteria = FindUserByIdCriteriaMother.random();
		expect(criteria).toBeInstanceOf(FindUserByIdCriteria);
	});

	test('should create a FindUserByIdCriteria with a specific id', () => {
		const id = TalentCrafterIdMother.random().value;
		const criteria = FindUserByIdCriteriaMother.create(id);
		expect(criteria.id.value).toBe(id);
	});
});
