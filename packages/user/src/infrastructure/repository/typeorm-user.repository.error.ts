import DomainError from '@hexadrop/error';

export default class TypeORMUserError extends DomainError {
	constructor(error: Error | string) {
		super('TypeORMUserError', typeof error === 'string' ? error : error.message, 'USR(500)');
	}
}
