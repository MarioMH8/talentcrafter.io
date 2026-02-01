/* eslint-disable typescript/restrict-plus-operands */
import StringValueObject from '@hexadrop/value-object/string';

import UserPasswordError from './user-password.error';

const MIN_LENGTH = 8;
const ENCRYPTED_PASSWORD_REGEX_FORMAT = /^{bcrypt}.*$/;

const RANDOM_LENGTH = MIN_LENGTH + 4;
const UPPER_VALUES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_VALUES = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_VALUES = '0123456789';
const SPECIAL_VALUES = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
const ALL_VALUES = UPPER_VALUES + LOWER_VALUES + NUMBER_VALUES + SPECIAL_VALUES;

export default class UserPassword extends StringValueObject {
	constructor(value: string) {
		UserPassword.check(value);
		super(value, undefined, 'UserPassword');
	}

	static isEncrypted(value: string): boolean {
		return ENCRYPTED_PASSWORD_REGEX_FORMAT.test(value);
	}

	static isSecure(value: string): boolean {
		return (
			this.hasMinLength(value) &&
			this.hasUpperCase(value) &&
			this.hasLowerCase(value) &&
			this.hasNumber(value) &&
			this.hasSpecialCharacter(value)
		);
	}

	static isValid(value: string): boolean {
		if (!value) {
			return false;
		}
		if (UserPassword.isSecure(value)) {
			return true;
		}

		return this.isSecure(value);
	}

	static random(): string {
		const getRandom = (value: string) => value[Math.floor(Math.random() * value.length)];

		let password = '';
		// Ensure at least one of each required type
		password += getRandom(UPPER_VALUES);
		password += getRandom(LOWER_VALUES);
		password += getRandom(NUMBER_VALUES);
		password += getRandom(SPECIAL_VALUES);

		// Fill the rest
		for (let index = 4; index < RANDOM_LENGTH; index++) {
			password += getRandom(ALL_VALUES);
		}

		// Shuffle
		return (
			password
				// eslint-disable-next-line unicorn/prefer-spread
				.split('')
				.toSorted(() => 0.5 - Math.random())
				.join('')
		);
	}

	private static check(value?: string): void {
		if (!value) {
			throw new UserPasswordError('User password is required');
		}
		if (UserPassword.isEncrypted(value)) {
			return;
		}
		if (!this.hasMinLength(value)) {
			throw new UserPasswordError(`User password must be at least ${MIN_LENGTH.toFixed(0)} characters`);
		}
		if (!this.hasUpperCase(value)) {
			throw new UserPasswordError('User password must contain at least one uppercase letter');
		}
		if (!this.hasLowerCase(value)) {
			throw new UserPasswordError('User password must contain at least one lowercase letter');
		}
		if (!this.hasNumber(value)) {
			throw new UserPasswordError('User password must contain at least one number');
		}
		if (!this.hasSpecialCharacter(value)) {
			throw new UserPasswordError('User password must contain at least one special character');
		}
	}

	private static hasLowerCase(value: string): boolean {
		return /[a-z]/.test(value);
	}

	private static hasMinLength(value: string): boolean {
		return value.length >= MIN_LENGTH;
	}

	private static hasNumber(value: string): boolean {
		return /\d/.test(value);
	}

	private static hasSpecialCharacter(value: string): boolean {
		return /[\W_]/.test(value);
	}

	private static hasUpperCase(value: string): boolean {
		return /[A-Z]/.test(value);
	}

	isEncrypted(): boolean {
		return UserPassword.isEncrypted(this.value);
	}
}
