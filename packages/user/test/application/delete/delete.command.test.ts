import { DeleteUserCommand } from '@talentcrafter/user/application';
import { DeleteUserCommandMother } from '@talentcrafter/user/mother/application';
import { describe, expect, test } from 'bun:test';

describe('DeleteUserCommand', () => {
	test('should create a valid DeleteUserCommand', () => {
		const command = DeleteUserCommandMother.random();
		expect(command).toBeInstanceOf(DeleteUserCommand);
		expect(command.commandName).toBe('user.delete');
	});

	test('should create a DeleteUserCommand with specific values', () => {
		const id = 'user-id';
		const deleter = 'deleter-id';

		const command = DeleteUserCommandMother.create({
			deleter,
			id,
		});

		expect(command.id).toBe(id);
		expect(command.deleter).toBe(deleter);
	});
});
