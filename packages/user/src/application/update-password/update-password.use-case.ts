import type { CommandHandler } from '@hexadrop/command/bus';
import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import type EventBus from '@hexadrop/event/bus';

import type { UserPasswordService, UserRepository } from '../../domain';
import { FindUserByIdCriteria, User, UserPassword } from '../../domain';
import UpdateUserPasswordCommand from './update-password.command';
import UpdateUserPasswordError from './update-password.use-case.error';

export default class UserPasswordUpdater implements CommandHandler<UpdateUserPasswordCommand> {
	constructor(
		private readonly eventBus: EventBus,
		private readonly repository: UserRepository,
		private readonly password: UserPasswordService
	) {}

	async run({ id, password, updater }: UpdateUserPasswordCommand): Promise<Either<DomainError, void>> {
		const criteria = new FindUserByIdCriteria({ id });
		const userEither = await this.repository.find(criteria);

		if (userEither.isLeft()) {
			return Either.left(userEither.getLeft());
		}

		const user = userEither.getRight();

		if (!user) {
			return Either.left(new UpdateUserPasswordError(`User with id '${id}' not found`));
		}

		let hashedPassword = password;
		if (!UserPassword.isEncrypted(password)) {
			const hashedPasswordEither = this.password.hash(password);
			if (hashedPasswordEither.isLeft()) {
				return Either.left(hashedPasswordEither.getLeft());
			}
			hashedPassword = hashedPasswordEither.getRight().value;
		}

		const updatedEither = User.updatePassword(user, hashedPassword, updater);

		if (updatedEither.isLeft()) {
			return Either.left(updatedEither.getLeft());
		}

		const updated = updatedEither.getRight();

		const updateEither = await this.repository.upsert(updated);

		if (updateEither.isLeft()) {
			return Either.left(updateEither.getLeft());
		}

		await this.eventBus.publish(...updated.pullDomainEvents());

		return Either.right();
	}
}
