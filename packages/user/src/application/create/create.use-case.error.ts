import InvalidArgumentError from '@hexadrop/error/invalid-argument';

export default class CreateUserDuplicatedError extends InvalidArgumentError {
	constructor(message: string) {
		super(message, 'CreateUserDuplicatedError', 'USR(409)');
	}
}
