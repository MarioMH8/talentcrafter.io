import InvalidArgumentError from '@hexadrop/error/invalid-argument';

export default class TenantKeyError extends InvalidArgumentError {
	constructor(message: string) {
		super(message, 'TenantKeyError', 'TLN(400)');
	}
}
