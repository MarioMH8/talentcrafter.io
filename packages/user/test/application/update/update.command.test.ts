import { UpdateUserCommand } from '@talentcrafter/user/application';
import { UpdateUserCommandMother } from '@talentcrafter/user/mother/application';
import { describe, expect, test } from 'bun:test';

describe('UpdateUserCommand', () => {
	test('should create a valid UpdateUserCommand', () => {
		const command = UpdateUserCommandMother.random();
		expect(command).toBeInstanceOf(UpdateUserCommand);
		expect(command.commandName).toBe('user.update');
	});

	test('should create a UpdateUserCommand with specific values', () => {
		const id = 'user-id';
		const updater = 'updater-id';
		const email = 'test@example.com';

		const command = UpdateUserCommandMother.create({
			email,
			id,
			updater,
		});

		expect(command.id).toBe(id);
		expect(command.updater).toBe(updater);
		expect(command.email).toBe(email);
	});
});
