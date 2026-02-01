import type { CommandConstructorParameters } from '@hexadrop/command';
import Command from '@hexadrop/command';
import type { Nullable } from '@hexadrop/types/nullable';

export default class CreateUserCommand extends Command {
	static override readonly COMMAND_NAME = 'user.create';
	readonly creator: string;
	readonly email: string;
	readonly id: string;
	readonly password?: Nullable<string>;

	constructor(primitives: CommandConstructorParameters<CreateUserCommand>) {
		const { creator, email, id, password } = primitives;
		super(CreateUserCommand.COMMAND_NAME);
		this.id = id;
		this.email = email;
		this.password = password;
		this.creator = creator;
	}
}
