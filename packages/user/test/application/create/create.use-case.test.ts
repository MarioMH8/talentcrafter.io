import MockEventBus from '@hexadrop/event/bus/mock/bun';
import { UserCreator } from '@talentcrafter/user/application';
import { MockUserPasswordService } from '@talentcrafter/user/mock/infrastructure';
import { MockUserRepository } from '@talentcrafter/user/mock/infrastructure/repository';
import { CreateUserCommandMother } from '@talentcrafter/user/mother/application/create';
import { UserMother, UserPasswordMother } from '@talentcrafter/user/mother/domain';
import { FindUserByEmailCriteriaMother } from '@talentcrafter/user/mother/domain/criteria';
import { UserCreatedEventMother } from '@talentcrafter/user/mother/domain/event';
import { afterEach, beforeEach, describe, expect, setSystemTime, test } from 'bun:test';

describe('UserCreator', () => {
	let eventBus: MockEventBus;
	let repository: MockUserRepository;
	let passwordService: MockUserPasswordService;
	let useCase: UserCreator;
	let date: Date;

	beforeEach(() => {
		eventBus = new MockEventBus();
		repository = new MockUserRepository();
		passwordService = new MockUserPasswordService();
		useCase = new UserCreator(eventBus, repository, passwordService);
		date = new Date();
		setSystemTime(date);
	});

	afterEach(() => {
		setSystemTime();
	});

	test('should create a user', async () => {
		const command = CreateUserCommandMother.random();
		const hashedPassword = UserPasswordMother.create('{bcrypt}hashed');
		const criteria = FindUserByEmailCriteriaMother.create(command.email);
		const user = UserMother.fromCommand(command, {
			password: hashedPassword.value,
		});

		repository.withMockFind(undefined, criteria);
		passwordService.withMockHash(hashedPassword.value);

		const result = await useCase.run(command);

		expect(result.isRight()).toBe(true);

		repository.assertLastFind(criteria);

		repository.assertLastUpsertAre(user);

		// Verify event publication
		eventBus.assertLastPublishedEvents(
			UserCreatedEventMother.create({
				createdAt: date,
				createdBy: command.creator,
				email: command.email,
				id: command.id,
				password: hashedPassword.value,
				updatedAt: date,
				updatedBy: command.creator,
			})
		);
	});

	test('should return error if user already exists', async () => {
		const command = CreateUserCommandMother.random();
		const criteria = FindUserByEmailCriteriaMother.create(command.email);
		const existingUser = UserMother.create({ email: command.email });

		repository.withMockFind(existingUser, criteria);

		const result = await useCase.run(command);

		expect(result.isLeft()).toBe(true);
		expect(result.getLeft().message).toBe(`User with email '${command.email}' already exists.`);
		repository.assertLastFind(criteria);
		repository.assertUpsertIsNotCall();
		eventBus.assertNotPublishEvent();
	});

	test('should hash password if not encrypted', async () => {
		const plainPassword = 'Password123!';
		const command = CreateUserCommandMother.create({ password: plainPassword });
		const hashedPassword = UserPasswordMother.create('{bcrypt}hashed');
		const criteria = FindUserByEmailCriteriaMother.create(command.email);

		repository.withMockFind(undefined, criteria);
		passwordService.withMockHash(hashedPassword.value);

		const useCase = new UserCreator(eventBus, repository, passwordService);

		await useCase.run(command);

		passwordService.assertLastHash(plainPassword);
	});

	test('should not hash password if already encrypted', async () => {
		const encryptedPassword = '{bcrypt}already-hashed';
		const command = CreateUserCommandMother.create({ password: encryptedPassword });
		const criteria = FindUserByEmailCriteriaMother.create(command.email);

		repository.withMockFind(undefined, criteria);

		const useCase = new UserCreator(eventBus, repository, passwordService);

		await useCase.run(command);

		passwordService.assertHashIsNotCall();
	});
});
