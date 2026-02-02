import DomainError from '@hexadrop/error';

export default class UpdateUserPasswordError extends DomainError {
	constructor(message: string) {
		super('UpdateUserPasswordError', message, 'USR(500)');
	}
}
