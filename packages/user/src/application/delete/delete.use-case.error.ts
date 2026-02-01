import DomainError from '@hexadrop/error';

export default class DeleteUserError extends DomainError {
	constructor(message: string) {
		super('DeleteUserError', message, 'USR(500)');
	}
}
