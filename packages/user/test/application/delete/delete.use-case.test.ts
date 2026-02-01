import MockEventBus from '@hexadrop/event/bus/mock/bun';
import { UserDeleter } from '@talentcrafter/user/application';
import { MockUserRepository } from '@talentcrafter/user/mock/infrastructure/repository';
import { DeleteUserCommandMother } from '@talentcrafter/user/mother/application/delete';
import { UserMother } from '@talentcrafter/user/mother/domain';
import { FindUserByIdCriteriaMother } from '@talentcrafter/user/mother/domain/criteria';
import { UserDeletedEventMother } from '@talentcrafter/user/mother/domain/event';
import { afterEach, beforeEach, describe, expect, setSystemTime, test } from 'bun:test';

describe('UserDeleter', () => {
	let eventBus: MockEventBus;
	let repository: MockUserRepository;
	let useCase: UserDeleter;
	let date: Date;

	beforeEach(() => {
		eventBus = new MockEventBus();
		repository = new MockUserRepository();
		useCase = new UserDeleter(eventBus, repository);
		date = new Date();
		setSystemTime(date);
	});

	afterEach(() => {
		setSystemTime();
	});

	test('should delete a user', async () => {
		const command = DeleteUserCommandMother.random();
		const user = UserMother.create({ id: command.id });
		const deleted = UserMother.create({
			...user.toPrimitives(),
			deletedAt: date,
			deletedBy: command.deleter,
		});
		const criteria = FindUserByIdCriteriaMother.create(command.id);

		repository.withMockFind(user, criteria);

		const result = await useCase.run(command);

		expect(result.isRight()).toBe(true);
		repository.assertLastFind(criteria);
		repository.assertLastDeletedAre(deleted);

		// Verify event publication
		eventBus.assertLastPublishedEvents(
			UserDeletedEventMother.create({
				deletedAt: date,
				deletedBy: command.deleter,
				id: command.id,
			})
		);
	});

	test('should return error if user does not exist', async () => {
		const command = DeleteUserCommandMother.random();
		const criteria = FindUserByIdCriteriaMother.create(command.id);

		repository.withMockFind(undefined, criteria);

		const result = await useCase.run(command);

		expect(result.isLeft()).toBe(true);
		expect(result.getLeft().message).toBe(`User with id '${command.id}' not found`);
		repository.assertLastFind(criteria);
		repository.assertDeleteIsNotCall();
		eventBus.assertNotPublishEvent();
	});
});
