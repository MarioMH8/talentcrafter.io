import { UserCreatedEvent } from '@talentcrafter/user/domain';
import { UserMother } from '@talentcrafter/user/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('UserCreatedEvent', () => {
	test('should create a valid UserCreatedEvent', () => {
		const user = UserMother.random();
		const event = UserCreatedEvent.fromDomain(user);

		expect(event).toBeInstanceOf(UserCreatedEvent);
		expect(event.eventName).toBe('user.created');
		expect(event.aggregateId).toBe(user.id.value);
		expect(event.id).toBe(user.id.value);
		expect(event.email).toBe(user.email.value);
		expect(event.createdAt).toBe(user.createdAt.value);
		expect(event.createdBy).toBe(user.createdBy.value);
		expect(event.updatedAt).toBe(user.updatedAt.value);
		expect(event.updatedBy).toBe(user.updatedBy.value);
	});
});
