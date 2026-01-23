import InvalidArgumentError from '@hexadrop/error/invalid-argument';

export default class TenantNameError extends InvalidArgumentError {
	constructor(message: string) {
		super(message, 'TenantNameError', 'TLN(400)');
	}
}
