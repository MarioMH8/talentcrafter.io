import type Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import type { Awaitable } from '@hexadrop/types/awaitable';
import type { Nullable } from '@hexadrop/types/nullable';

import type { FindUserCriteria, SearchUserCriteria } from '../criteria';
import type User from '../user';

type UserRepositoryFindParameters = [FindUserCriteria];
type UserRepositoryFindReturn = Either<DomainError, Nullable<User>>;

type UserRepositorySearchParameters = [SearchUserCriteria];
type UserRepositorySearchReturn = Either<DomainError, [User[], number]>;

type UserRepositoryUpsertParameters = [User, ...User[]];
type UserRepositoryUpsertReturn = Either<DomainError, void>;

type UserRepositoryDeleteParameters = [User, ...User[]];
type UserRepositoryDeleteReturn = Either<DomainError, void>;

abstract class UserRepository {
	abstract delete(...parameters: UserRepositoryDeleteParameters): Awaitable<UserRepositoryDeleteReturn>;
	abstract find(...parameters: UserRepositoryFindParameters): Awaitable<UserRepositoryFindReturn>;
	abstract search(...parameters: UserRepositorySearchParameters): Awaitable<UserRepositorySearchReturn>;
	abstract upsert(...parameters: UserRepositoryUpsertParameters): Awaitable<UserRepositoryUpsertReturn>;
}

export { UserRepository };

export type {
	UserRepositoryDeleteParameters,
	UserRepositoryDeleteReturn,
	UserRepositoryFindParameters,
	UserRepositoryFindReturn,
	UserRepositorySearchParameters,
	UserRepositorySearchReturn,
	UserRepositoryUpsertParameters,
	UserRepositoryUpsertReturn,
};
