import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import type { Nullable, PartialNullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';
import { TalentCrafterAggregateRoot } from '@talentcrafter/aggregate-root/domain';

import { UserCreatedEvent, UserDeletedEvent, UserPasswordUpdatedEvent, UserUpdatedEvent } from './event';
import UserEmail from './user-email';
import UserPassword from './user-password';

type UserCreateParameters = Partial<Pick<Primitives<User>, 'password'>> & Pick<Primitives<User>, 'email' | 'id'>;
type UserUpdateParameters = PartialNullable<Pick<Primitives<User>, 'email'>>;

export default class User extends TalentCrafterAggregateRoot {
	readonly email: UserEmail;
	readonly password?: Nullable<UserPassword>;

	constructor(primitives: Primitives<User>) {
		super(primitives);
		const { email, password } = primitives;
		this.email = new UserEmail(email);
		this.password = password ? new UserPassword(password) : undefined;
	}

	static create(user: UserCreateParameters, creator: string): Either<DomainError, User> {
		try {
			const created = new User({
				...user,
				createdAt: new Date(),
				createdBy: creator,
				deletedAt: undefined,
				deletedBy: undefined,
				password: user.password,
				updatedAt: new Date(),
				updatedBy: creator,
			});
			created.record(UserCreatedEvent.fromDomain(created));

			return Either.right(created);
		} catch (error) {
			if (error instanceof DomainError) {
				return Either.left(error);
			}
			throw error;
		}
	}

	static delete(user: User, deleter: string): Either<DomainError, User> {
		try {
			const deletedAt = new Date();
			const deletedBy = deleter;

			const deleted = new User({
				...user.toPrimitives(),
				deletedAt,
				deletedBy,
			});
			deleted.record(UserDeletedEvent.fromDomain(deleted, deletedBy, deletedAt));

			return Either.right(deleted);
		} catch (error) {
			if (error instanceof DomainError) {
				return Either.left(error);
			}
			throw error;
		}
	}

	static update(user: User, parameters: UserUpdateParameters, updater: string): Either<DomainError, User> {
		try {
			const updated = new User({
				...user.toPrimitives(),
				createdAt: user.createdAt.value,
				createdBy: user.createdBy.value,
				deletedAt: undefined,
				deletedBy: undefined,
				email: parameters.email ?? user.email.value,
				updatedAt: new Date(),
				updatedBy: updater,
			});
			updated.record(UserUpdatedEvent.fromDomain(user, updated));

			return Either.right(updated);
		} catch (error) {
			if (error instanceof DomainError) {
				return Either.left(error);
			}
			throw error;
		}
	}

	static updatePassword(user: User, password: string, updater: string): Either<DomainError, User> {
		try {
			const updated = new User({
				...user.toPrimitives(),
				createdAt: user.createdAt.value,
				createdBy: user.createdBy.value,
				deletedAt: undefined,
				deletedBy: undefined,
				password,
				updatedAt: new Date(),
				updatedBy: updater,
			});
			updated.record(UserPasswordUpdatedEvent.fromDomain(updated));

			return Either.right(updated);
		} catch (error) {
			if (error instanceof DomainError) {
				return Either.left(error);
			}
			throw error;
		}
	}

	override toPrimitives(): Primitives<User> {
		return {
			...super.toPrimitives(),
			email: this.email.value,
			password: this.password?.value,
		};
	}
}
