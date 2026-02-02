import type { CommandConstructorParameters } from '@hexadrop/command';
import Command from '@hexadrop/command';

export default class UpdateUserPasswordCommand extends Command {
	static override readonly COMMAND_NAME = 'user.update-password';
	readonly id: string;
	readonly password: string;
	readonly updater: string;

	constructor({ id, password, updater }: CommandConstructorParameters<UpdateUserPasswordCommand>) {
		super(UpdateUserPasswordCommand.COMMAND_NAME);
		this.id = id;
		this.updater = updater;
		this.password = password;
	}
}
