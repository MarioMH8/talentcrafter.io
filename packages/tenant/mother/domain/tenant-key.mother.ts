import { faker } from '@faker-js/faker';
import { TenantKey } from '@talentcrafter/tenant/domain';

export default class TenantKeyMother {
	static create(value?: string): TenantKey {
		return new TenantKey(value ?? faker.word.noun({ length: { max: 20, min: 4 } }));
	}

	static random(): TenantKey {
		return this.create();
	}
}
