import InvalidArgumentError from '@hexadrop/error/invalid-argument';

export default class UserEmailError extends InvalidArgumentError {
	constructor(message: string) {
		super(message, 'UserEmailError', 'USR(400)');
	}
}
