import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import type { Nullable } from '@hexadrop/types/nullable';

import { UserPassword, UserPasswordError, UserPasswordService } from '../../domain';

export default class EncryptedUserPasswordService extends UserPasswordService {
	check(storedPassword: Nullable<string>, inputPassword: Nullable<string>): Either<DomainError, boolean> {
		if (!storedPassword || !inputPassword) {
			return Either.right(false);
		}

		return Either.right(this.validatePassword(storedPassword, inputPassword));
	}

	hash(password: string, bypassSecure?: boolean): Either<DomainError, UserPassword> {
		if (!bypassSecure && !UserPassword.isSecure(password)) {
			return Either.left(
				new UserPasswordError(
					`La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.`
				)
			);
		}
		const hashed = Bun.password.hashSync(password, {
			algorithm: 'bcrypt',
			cost: 10,
		});

		return Either.right(new UserPassword(`{bcrypt}${hashed}`));
	}

	private validatePassword(storedPassword: string, inputPassword: string): boolean {
		if (!storedPassword) {
			return false;
		}
		if (storedPassword.includes('{MD5}')) {
			const hashed = storedPassword.replace('{MD5}', '');
			const converted = Bun.MD5.hash(inputPassword, 'hex');

			return converted === hashed;
		}
		if (storedPassword.includes('{bcrypt}')) {
			const hashed = storedPassword.replace('{bcrypt}', '');

			return Bun.password.verifySync(inputPassword, hashed, 'bcrypt');
		}
		if (storedPassword.includes('{noop}')) {
			const p = storedPassword.replace('{noop}', '');

			return inputPassword === p;
		}

		return false;
	}
}
