import { UserUpdatedEvent } from '@talentcrafter/user/domain';
import { UserMother } from '@talentcrafter/user/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('UserUpdatedEvent', () => {
	test('should create a valid UserUpdatedEvent', () => {
		const oldUser = UserMother.random();
		const newUser = UserMother.create({ id: oldUser.id.value });
		const event = UserUpdatedEvent.fromDomain(oldUser, newUser);

		expect(event).toBeInstanceOf(UserUpdatedEvent);
		expect(event.eventName).toBe('user.updated');
		expect(event.aggregateId).toBe(newUser.id.value);
		expect(event.id).toBe(newUser.id.value);
		expect(event.updatedAt).toBe(newUser.updatedAt.value);
		expect(event.updatedBy).toBe(newUser.updatedBy.value);
	});

	test('should include changed email', () => {
		const oldUser = UserMother.random();
		const newUser = UserMother.create({ email: 'new@example.com', id: oldUser.id.value });
		const event = UserUpdatedEvent.fromDomain(oldUser, newUser);

		expect(event.email).toBe(newUser.email.value);
	});

	test('should not include unchanged email', () => {
		const oldUser = UserMother.random();
		const newUser = UserMother.create({ email: oldUser.email.value, id: oldUser.id.value });
		const event = UserUpdatedEvent.fromDomain(oldUser, newUser);

		expect(event.email).toBeUndefined();
	});
});
