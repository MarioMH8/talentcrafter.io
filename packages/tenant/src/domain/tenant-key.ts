import StringValueObject from '@hexadrop/value-object/string';

import TenantKeyError from './tenant-key.error';

const MIN_LENGTH = 3;
const MAX_LENGTH = 50;
const TENANT_KEY_REGEX = /^[a-z0-9-]{3,50}$/;

export default class TenantKey extends StringValueObject {
	constructor(value: string) {
		TenantKey.check(value);
		super(value, undefined, 'TenantKey');
	}

	private static check(value?: string): void {
		if (!value) {
			throw new TenantKeyError('Tenant key is required');
		}
		if (value.length < MIN_LENGTH) {
			throw new TenantKeyError(`Tenant key must be at least ${MIN_LENGTH.toFixed(0)} characters`);
		}
		if (value.length > MAX_LENGTH) {
			throw new TenantKeyError(`Tenant key must be at most ${MAX_LENGTH.toFixed(0)} characters`);
		}
		if (!TENANT_KEY_REGEX.test(value)) {
			throw new TenantKeyError(`Tenant key has incorrect format`);
		}
	}
}
