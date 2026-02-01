import type { CommandConstructorParameters } from '@hexadrop/command';
import Command from '@hexadrop/command';

export default class DeleteUserCommand extends Command {
	static override readonly COMMAND_NAME = 'user.delete';
	readonly deleter: string;
	readonly id: string;

	constructor({ deleter, id }: CommandConstructorParameters<DeleteUserCommand>) {
		super(DeleteUserCommand.COMMAND_NAME);
		this.id = id;
		this.deleter = deleter;
	}
}
