import MockEventBus from '@hexadrop/event/bus/mock/bun';
import { UserUpdater } from '@talentcrafter/user/application';
import { MockUserRepository } from '@talentcrafter/user/mock/infrastructure';
import { UpdateUserCommandMother } from '@talentcrafter/user/mother/application';
import {
	FindUserByEmailCriteriaMother,
	FindUserByIdCriteriaMother,
	UserEmailMother,
	UserMother,
	UserUpdatedEventMother,
} from '@talentcrafter/user/mother/domain';
import { afterEach, beforeEach, describe, expect, setSystemTime, test } from 'bun:test';

describe('UserUpdater', () => {
	let eventBus: MockEventBus;
	let repository: MockUserRepository;
	let useCase: UserUpdater;
	let date: Date;

	beforeEach(() => {
		eventBus = new MockEventBus();
		repository = new MockUserRepository();
		useCase = new UserUpdater(eventBus, repository);
		date = new Date();
		setSystemTime(date);
	});

	afterEach(() => {
		setSystemTime();
	});

	test('should update a user', async () => {
		const email = UserEmailMother.random();
		const command = UpdateUserCommandMother.create({
			email: email.value,
		});
		const user = UserMother.create({ id: command.id });
		const expectedUpdatedUser = UserMother.create({
			...user.toPrimitives(),
			email: command.email,
			updatedAt: date,
			updatedBy: command.updater,
		});
		const findByIdCriteria = FindUserByIdCriteriaMother.create(command.id);
		const findByEmailCriteria = FindUserByEmailCriteriaMother.create(email.value);

		repository.withMockFind(user, findByIdCriteria);
		repository.withMockFind(undefined, findByEmailCriteria);

		const result = await useCase.run(command);

		expect(result.isRight()).toBe(true);
		repository.assertLastFind(findByIdCriteria);
		repository.assertLastFind(findByEmailCriteria);
		repository.assertLastUpsertAre(expectedUpdatedUser);

		eventBus.assertLastPublishedEvents(
			UserUpdatedEventMother.create({
				email: command.email,
				id: command.id,
				updatedAt: date,
				updatedBy: command.updater,
			})
		);
	});

	test('should return error if user does not exist', async () => {
		const command = UpdateUserCommandMother.random();
		const findByIdCriteria = FindUserByIdCriteriaMother.create(command.id);

		repository.withMockFind(undefined, findByIdCriteria);

		const result = await useCase.run(command);

		expect(result.isLeft()).toBe(true);
		expect(result.getLeft().message).toBe(`User with id '${command.id}' not found`);
		repository.assertLastFind(findByIdCriteria);
		repository.assertUpsertIsNotCall();
		eventBus.assertNotPublishEvent();
	});

	test('should return error if email is already in use by another user', async () => {
		const email = UserEmailMother.random();
		const command = UpdateUserCommandMother.create({
			email: email.value,
		});
		const user = UserMother.create({ id: command.id });
		const anotherUser = UserMother.create({ email: command.email });
		const findByIdCriteria = FindUserByIdCriteriaMother.create(command.id);
		const findByEmailCriteria = FindUserByEmailCriteriaMother.create(email.value);

		repository.withMockFind(user, findByIdCriteria);
		repository.withMockFind(anotherUser, findByEmailCriteria);

		const result = await useCase.run(command);

		expect(result.isLeft()).toBe(true);
		expect(result.getLeft().message).toBe(`User with email '${email.value}' already exists.`);
		repository.assertLastFind(findByIdCriteria);
		repository.assertLastFind(findByEmailCriteria);
		repository.assertUpsertIsNotCall();
		eventBus.assertNotPublishEvent();
	});

	test('should not fail if email is used by the same user', async () => {
		const email = UserEmailMother.random();
		const user = UserMother.create({
			email: email.value,
		});
		const command = UpdateUserCommandMother.create({
			email: user.email.value,
			id: user.id.value,
		});
		const expectedUpdatedUser = UserMother.create({
			...user.toPrimitives(),
			email: command.email,
			updatedAt: date,
			updatedBy: command.updater,
		});
		const findByIdCriteria = FindUserByIdCriteriaMother.create(command.id);
		const findByEmailCriteria = FindUserByEmailCriteriaMother.create(email.value);

		repository.withMockFind(user, findByIdCriteria);
		repository.withMockFind(user, findByEmailCriteria);

		const result = await useCase.run(command);

		expect(result.isRight()).toBe(true);
		repository.assertLastFind(findByIdCriteria);
		repository.assertLastFind(findByEmailCriteria);
		repository.assertLastUpsertAre(expectedUpdatedUser);
	});
});
