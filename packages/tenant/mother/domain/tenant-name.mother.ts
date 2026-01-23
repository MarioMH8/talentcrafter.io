import { faker } from '@faker-js/faker';
import { TenantName } from '@talentcrafter/tenant/domain';

export default class TenantNameMother {
	static create(value?: string): TenantName {
		return new TenantName(value ?? faker.company.name());
	}

	static random(): TenantName {
		return this.create();
	}
}
