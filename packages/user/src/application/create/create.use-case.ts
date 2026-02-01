import type { CommandHandler } from '@hexadrop/command/bus';
import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import type EventBus from '@hexadrop/event/bus';

import type { UserPasswordService, UserRepository } from '../../domain';
import { FindUserByEmailCriteria, User, UserPassword } from '../../domain';
import CreateUserCommand from './create.command';
import CreateUserDuplicatedError from './create.use-case.error';

export default class UserCreator implements CommandHandler<CreateUserCommand> {
	constructor(
		private readonly eventBus: EventBus,
		private readonly repository: UserRepository,
		private readonly password: UserPasswordService
	) {}

	async run({ creator, email, id, password }: CreateUserCommand): Promise<Either<DomainError, void>> {
		const duplicatedByEmailEither = await this.repository.find(new FindUserByEmailCriteria({ email }));
		if (duplicatedByEmailEither.isLeft()) {
			return Either.left(duplicatedByEmailEither.getLeft());
		}
		if (duplicatedByEmailEither.getRight()) {
			return Either.left(new CreateUserDuplicatedError(`User with email '${email}' already exists.`));
		}

		let hashedPassword: string | undefined;
		if (password) {
			if (UserPassword.isEncrypted(password)) {
				hashedPassword = password;
			} else {
				const hashedPasswordEither = this.password.hash(password);
				if (hashedPasswordEither.isLeft()) {
					return Either.left(hashedPasswordEither.getLeft());
				}
				hashedPassword = hashedPasswordEither.getRight().value;
			}
		}

		const createdEither = User.create(
			{
				email,
				id,
				password: hashedPassword,
			},
			creator
		);
		if (createdEither.isLeft()) {
			return Either.left(createdEither.getLeft());
		}

		const created = createdEither.getRight();

		const createEither = await this.repository.upsert(created);
		if (createEither.isLeft()) {
			return Either.left(createEither.getLeft());
		}
		await this.eventBus.publish(...created.pullDomainEvents());

		return Either.right();
	}
}
