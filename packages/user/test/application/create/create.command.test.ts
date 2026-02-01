import { CreateUserCommand } from '@talentcrafter/user/application';
import { CreateUserCommandMother } from '@talentcrafter/user/mother/application';
import { describe, expect, test } from 'bun:test';

describe('CreateUserCommand', () => {
	test('should create a valid CreateUserCommand', () => {
		const command = CreateUserCommandMother.random();
		expect(command).toBeInstanceOf(CreateUserCommand);
		expect(command.commandName).toBe('user.create');
	});

	test('should create a CreateUserCommand with specific values', () => {
		const id = 'user-id';
		const email = 'test@example.com';
		const password = 'Password123!';
		const creator = 'creator-id';

		const command = CreateUserCommandMother.create({
			creator,
			email,
			id,
			password,
		});

		expect(command.id).toBe(id);
		expect(command.email).toBe(email);
		expect(command.password).toBe(password);
		expect(command.creator).toBe(creator);
	});
});
