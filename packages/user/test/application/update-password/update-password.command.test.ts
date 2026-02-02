import { UpdateUserPasswordCommand } from '@talentcrafter/user/application';
import { UpdateUserPasswordCommandMother } from '@talentcrafter/user/mother/application';
import { describe, expect, test } from 'bun:test';

describe('UpdateUserPasswordCommand', () => {
	test('should create a valid UpdateUserPasswordCommand', () => {
		const command = UpdateUserPasswordCommandMother.random();
		expect(command).toBeInstanceOf(UpdateUserPasswordCommand);
		expect(command.commandName).toBe('user.update-password');
	});

	test('should create a UpdateUserPasswordCommand with specific values', () => {
		const id = 'user-id';
		const updater = 'updater-id';
		const password = 'Password123!';

		const command = UpdateUserPasswordCommandMother.create({
			id,
			password,
			updater,
		});

		expect(command.id).toBe(id);
		expect(command.updater).toBe(updater);
		expect(command.password).toBe(password);
	});
});
