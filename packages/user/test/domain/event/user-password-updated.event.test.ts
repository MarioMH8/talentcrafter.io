import { UserPasswordUpdatedEvent } from '@talentcrafter/user/domain';
import { UserMother } from '@talentcrafter/user/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('UserPasswordUpdatedEvent', () => {
	test('should create a valid UserPasswordUpdatedEvent', () => {
		const user = UserMother.random();
		const event = UserPasswordUpdatedEvent.fromDomain(user);

		expect(event).toBeInstanceOf(UserPasswordUpdatedEvent);
		expect(event.eventName).toBe('user.password-updated');
		expect(event.aggregateId).toBe(user.id.value);
		expect(event.id).toBe(user.id.value);
		expect(event.updatedAt).toBe(user.updatedAt.value);
		expect(event.updatedBy).toBe(user.updatedBy.value);
	});
});
