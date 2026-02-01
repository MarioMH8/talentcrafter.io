import type Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import type { Nullable } from '@hexadrop/types/nullable';

import type UserPassword from '../user-password';

abstract class UserPasswordService {
	abstract check(userPassword: Nullable<string>, inputPassword: Nullable<string>): Either<DomainError, boolean>;
	abstract hash(password: string, bypassSecure?: boolean): Either<DomainError, UserPassword>;
}

// eslint-disable-next-line import/prefer-default-export
export { UserPasswordService };
