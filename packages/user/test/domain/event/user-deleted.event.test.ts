import {
	TalentCrafterDeletedAtMother,
	TalentCrafterDeletedByMother,
} from '@talentcrafter/aggregate-root/mother/domain';
import { UserDeletedEvent } from '@talentcrafter/user/domain';
import { UserMother } from '@talentcrafter/user/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('UserDeletedEvent', () => {
	test('should create a valid UserDeletedEvent', () => {
		const user = UserMother.random();
		const deletedBy = TalentCrafterDeletedByMother.random().value;
		const deletedAt = TalentCrafterDeletedAtMother.random().value;
		const event = UserDeletedEvent.fromDomain(user, deletedBy, deletedAt);

		expect(event).toBeInstanceOf(UserDeletedEvent);
		expect(event.eventName).toBe('user.deleted');
		expect(event.aggregateId).toBe(user.id.value);
		expect(event.id).toBe(user.id.value);
		expect(event.deletedAt).toBe(deletedAt);
		expect(event.deletedBy).toBe(deletedBy);
	});
});
