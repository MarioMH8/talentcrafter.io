import DomainError from '@hexadrop/error';

export default class UpdateUserError extends DomainError {
	constructor(message: string) {
		super('UpdateUserError', message, 'USR(500)');
	}
}
