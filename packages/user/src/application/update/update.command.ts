import type { CommandConstructorParameters } from '@hexadrop/command';
import Command from '@hexadrop/command';
import type { Nullable } from '@hexadrop/types/nullable';

export default class UpdateUserCommand extends Command {
	static override readonly COMMAND_NAME = 'user.update';
	readonly email?: Nullable<string>;
	readonly id: string;
	readonly updater: string;

	constructor({ email, id, updater }: CommandConstructorParameters<UpdateUserCommand>) {
		super(UpdateUserCommand.COMMAND_NAME);
		this.id = id;
		this.updater = updater;
		this.email = email;
	}
}
