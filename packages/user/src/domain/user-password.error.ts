import InvalidArgumentError from '@hexadrop/error/invalid-argument';

export default class UserPasswordError extends InvalidArgumentError {
	constructor(message: string) {
		super(message, 'UserPasswordError', 'USR(400)');
	}
}
