import MockEventBus from '@hexadrop/event/bus/mock/bun';
import { UserPasswordUpdater } from '@talentcrafter/user/application';
import { MockUserPasswordService, MockUserRepository } from '@talentcrafter/user/mock/infrastructure';
import { UpdateUserPasswordCommandMother } from '@talentcrafter/user/mother/application';
import {
	FindUserByIdCriteriaMother,
	UserMother,
	UserPasswordMother,
	UserPasswordUpdatedEventMother,
} from '@talentcrafter/user/mother/domain';
import { afterEach, beforeEach, describe, expect, setSystemTime, test } from 'bun:test';

describe('UserPasswordUpdater', () => {
	let eventBus: MockEventBus;
	let repository: MockUserRepository;
	let passwordService: MockUserPasswordService;
	let useCase: UserPasswordUpdater;
	let date: Date;

	beforeEach(() => {
		eventBus = new MockEventBus();
		repository = new MockUserRepository();
		passwordService = new MockUserPasswordService();
		useCase = new UserPasswordUpdater(eventBus, repository, passwordService);
		date = new Date();
		setSystemTime(date);
	});

	afterEach(() => {
		setSystemTime();
	});

	test('should update a user password', async () => {
		const command = UpdateUserPasswordCommandMother.random();
		const user = UserMother.create({ id: command.id });
		const findByIdCriteria = FindUserByIdCriteriaMother.create(command.id);
		const hashedPassword = UserPasswordMother.create('{bcrypt}hashed');

		repository.withMockFind(user, findByIdCriteria);
		passwordService.withMockHash(hashedPassword.value);

		const result = await useCase.run(command);

		expect(result.isRight()).toBe(true);
		repository.assertLastFind(findByIdCriteria);
		passwordService.assertLastHash(command.password);

		const expectedUpdatedUser = UserMother.create({
			...user.toPrimitives(),
			password: hashedPassword.value,
			updatedAt: date,
			updatedBy: command.updater,
		});
		repository.assertLastUpsertAre(expectedUpdatedUser);

		eventBus.assertLastPublishedEvents(
			UserPasswordUpdatedEventMother.create({
				id: command.id,
				updatedAt: date,
				updatedBy: command.updater,
			})
		);
	});

	test('should not hash password if already encrypted', async () => {
		const command = UpdateUserPasswordCommandMother.create({
			password: '{bcrypt}already-hashed',
		});
		const user = UserMother.create({ id: command.id });
		const findByIdCriteria = FindUserByIdCriteriaMother.create(command.id);

		repository.withMockFind(user, findByIdCriteria);

		await useCase.run(command);

		passwordService.assertHashIsNotCall();
	});

	test('should return error if user does not exist', async () => {
		const command = UpdateUserPasswordCommandMother.random();
		const findByIdCriteria = FindUserByIdCriteriaMother.create(command.id);

		repository.withMockFind(undefined, findByIdCriteria);

		const result = await useCase.run(command);

		expect(result.isLeft()).toBe(true);
		expect(result.getLeft().message).toBe(`User with id '${command.id}' not found`);
		repository.assertLastFind(findByIdCriteria);
		repository.assertUpsertIsNotCall();
		eventBus.assertNotPublishEvent();
	});
});
