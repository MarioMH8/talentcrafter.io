import { User } from '@talentcrafter/user/domain';
import { UserEmailMother, UserMother } from '@talentcrafter/user/mother/domain';
import { afterAll, beforeAll, describe, expect, setSystemTime, test } from 'bun:test';

describe('User', () => {
	const date = new Date('1999-01-01T00:00:00.000Z');
	beforeAll(() => {
		setSystemTime(date);
	});
	afterAll(() => {
		setSystemTime();
	});
	test('should create a valid User', () => {
		const user = UserMother.random();
		expect(user).toBeInstanceOf(User);
	});

	test('should create a User with specific email', () => {
		const userEmail = UserEmailMother.random();
		const user = UserMother.create({
			email: userEmail.value,
		});

		expect(user.email.value).toBe(userEmail.value);
	});

	test('should return primitives', () => {
		const user = UserMother.random();
		const primitives = user.toPrimitives();

		expect(primitives.id).toBe(user.id.value);
		expect(primitives.email).toBe(user.email.value);
	});

	describe('create', () => {
		test('should create a new User', () => {
			const randomUser = UserMother.random();
			const parameters = {
				email: randomUser.email.value,
				id: randomUser.id.value,
			};
			const creator = 'creator-id';
			const result = User.create(parameters, creator);

			expect(result.isRight()).toBe(true);

			const created = result.getRight();

			expect(created.id.value).toBe(parameters.id);
			expect(created.email.value).toBe(parameters.email);
			expect(created.createdBy.value).toBe(creator);
			expect(created.createdAt.value).toStrictEqual(date);
			expect(created.updatedBy.value).toBe(creator);
			expect(created.updatedAt.value).toStrictEqual(date);
			expect(created.deletedBy?.value).toBeUndefined();
			expect(created.deletedAt?.value).toBeUndefined();

			const events = created.pullDomainEvents();
			expect(events.length).toBe(1);
			expect(events[0]?.eventName).toBe('user.created');
		});
	});

	describe('update', () => {
		test('should update a User', () => {
			const user = UserMother.random();
			const newEmail = UserEmailMother.random();
			const updater = 'updater-id';

			const result = User.update(user, { email: newEmail.value }, updater);

			expect(result.isRight()).toBe(true);

			const updated = result.getRight();

			expect(updated.email.value).toBe(newEmail.value);
			expect(updated.createdBy.value).toBe(user.createdBy.value);
			expect(updated.createdAt.value).toBe(user.createdAt.value);
			expect(updated.updatedBy.value).toBe(updater);
			expect(updated.updatedAt.value).toStrictEqual(date);
			expect(updated.deletedBy?.value).toBeUndefined();
			expect(updated.deletedAt?.value).toBeUndefined();

			const events = updated.pullDomainEvents();
			expect(events.length).toBe(1);
			expect(events[0]?.eventName).toBe('user.updated');
		});
	});

	describe('delete', () => {
		test('should delete a User', () => {
			const user = UserMother.random();
			const deleter = 'deleter-id';

			const result = User.delete(user, deleter);

			expect(result.isRight()).toBe(true);

			const deleted = result.getRight();

			expect(deleted.createdBy.value).toBe(user.createdBy.value);
			expect(deleted.createdAt.value).toBe(user.createdAt.value);
			expect(deleted.updatedBy.value).toBe(user.updatedBy.value);
			expect(deleted.updatedAt.value).toBe(user.updatedAt.value);
			expect(deleted.deletedAt?.value).toStrictEqual(date);
			expect(deleted.deletedBy?.value).toBe(deleter);

			const events = deleted.pullDomainEvents();
			expect(events.length).toBe(1);
			expect(events[0]?.eventName).toBe('user.deleted');
		});
	});
});
