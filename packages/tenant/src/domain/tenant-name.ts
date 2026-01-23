import StringValueObject from '@hexadrop/value-object/string';

import TenantNameError from './tenant-name.error';

const MIN_LENGTH = 3;
const MAX_LENGTH = 200;

export default class TenantName extends StringValueObject {
	constructor(value: string) {
		TenantName.check(value);
		super(value, undefined, 'TenantName');
	}

	private static check(value?: string): void {
		if (!value) {
			throw new TenantNameError('Tenant name is required');
		}
		if (value.length < MIN_LENGTH) {
			throw new TenantNameError(`Tenant name must be at least ${MIN_LENGTH.toFixed(0)} characters`);
		}
		if (value.length > MAX_LENGTH) {
			throw new TenantNameError(`Tenant name must be at most ${MAX_LENGTH.toFixed(0)} characters`);
		}
	}
}
