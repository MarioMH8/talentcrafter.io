import type { CommandHandler } from '@hexadrop/command/bus';
import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import type EventBus from '@hexadrop/event/bus';

import type { UserRepository } from '../../domain';
import { FindUserByIdCriteria, User } from '../../domain';
import DeleteUserCommand from './delete.command';
import DeleteUserError from './delete.use-case.error';

export default class UserDeleter implements CommandHandler<DeleteUserCommand> {
	constructor(
		private readonly eventBus: EventBus,
		private readonly repository: UserRepository
	) {}

	async run({ deleter, id }: DeleteUserCommand): Promise<Either<DomainError, void>> {
		const criteria = new FindUserByIdCriteria({ id });
		const userEither = await this.repository.find(criteria);

		if (userEither.isLeft()) {
			return Either.left(userEither.getLeft());
		}

		const user = userEither.getRight();

		if (!user) {
			return Either.left(new DeleteUserError(`User with id '${id}' not found`));
		}

		const deletedEither = User.delete(user, deleter);

		if (deletedEither.isLeft()) {
			return Either.left(deletedEither.getLeft());
		}

		const deleted = deletedEither.getRight();

		const deleteEither = await this.repository.delete(deleted);

		if (deleteEither.isLeft()) {
			return Either.left(deleteEither.getLeft());
		}

		await this.eventBus.publish(...deleted.pullDomainEvents());

		return Either.right();
	}
}
