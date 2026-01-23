import type { PartialNullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';
import { TalentCrafterAggregateRootMother } from '@talentcrafter/aggregate-root/mother/domain';
import { Tenant } from '@talentcrafter/tenant/domain';

import TenantKeyMother from './tenant-key.mother';
import TenantNameMother from './tenant-name.mother';

export default class TenantMother {
	static create({ key, name, ...rest }: PartialNullable<Primitives<Tenant>> = {}): Tenant {
		return new Tenant({
			...TalentCrafterAggregateRootMother.create(rest),
			key: key ?? TenantKeyMother.random().value,
			name: name ?? TenantNameMother.random().value,
		});
	}

	static random(): Tenant {
		return this.create();
	}
}
