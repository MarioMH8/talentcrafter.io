import type { CommandHandler } from '@hexadrop/command/bus';
import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import type EventBus from '@hexadrop/event/bus';

import type { UserRepository } from '../../domain';
import { FindUserByEmailCriteria, FindUserByIdCriteria, User } from '../../domain';
import UpdateUserCommand from './update.command';
import UpdateUserError from './update.use-case.error';

export default class UserUpdater implements CommandHandler<UpdateUserCommand> {
	constructor(
		private readonly eventBus: EventBus,
		private readonly repository: UserRepository
	) {}

	async run({ email, id, updater }: UpdateUserCommand): Promise<Either<DomainError, void>> {
		const findByIdCriteria = new FindUserByIdCriteria({ id });
		const userEither = await this.repository.find(findByIdCriteria);

		if (userEither.isLeft()) {
			return Either.left(userEither.getLeft());
		}

		const user = userEither.getRight();

		if (!user) {
			return Either.left(new UpdateUserError(`User with id '${id}' not found`));
		}

		if (email) {
			const findByEmailCriteria = new FindUserByEmailCriteria({ email });
			const duplicatedEither = await this.repository.find(findByEmailCriteria);
			if (duplicatedEither.isLeft()) {
				return Either.left(duplicatedEither.getLeft());
			}
			if (duplicatedEither.getRight() && duplicatedEither.getRight()?.id.value !== id) {
				return Either.left(new UpdateUserError(`User with email '${email}' already exists.`));
			}
		}

		const updatedEither = User.update(user, { email }, updater);

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
