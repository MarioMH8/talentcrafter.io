import StringValueObject from '@hexadrop/value-object/string';

import UserPasswordError from './user-password.error';

const MIN_LENGTH = 8;
// Regex: At least one uppercase, one lowercase, one number and one special character
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

export default class UserPassword extends StringValueObject {
	constructor(value: string) {
		UserPassword.check(value);
		super(value, undefined, 'UserPassword');
	}

	private static check(value?: string): void {
		if (!value) {
			throw new UserPasswordError('User password is required');
		}
		if (value.length < MIN_LENGTH) {
			throw new UserPasswordError(`User password must be at least ${MIN_LENGTH.toFixed(0)} characters`);
		}
		if (!PASSWORD_REGEX.test(value)) {
			throw new UserPasswordError(
				'User password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
			);
		}
	}
}
