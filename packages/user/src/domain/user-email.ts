import StringValueObject from '@hexadrop/value-object/string';

import UserEmailError from './user-email.error';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default class UserEmail extends StringValueObject {
	constructor(value: string) {
		UserEmail.check(value);
		super(value, undefined, 'UserEmail');
	}

	private static check(value?: string): void {
		if (!value) {
			throw new UserEmailError('User email is required');
		}
		if (!EMAIL_REGEX.test(value)) {
			throw new UserEmailError('User email has incorrect format');
		}
	}
}
