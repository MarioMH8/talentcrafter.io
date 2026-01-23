import DomainEvent from '@hexadrop/event';
import type { Nullable, PartialNullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';

import type Tenant from '../tenant';

interface PartialTenant extends PartialNullable<Primitives<Tenant>> {
	id: string;
	updatedAt: Date;
	updatedBy: string;
}

export default class TenantUpdatedEvent extends DomainEvent implements PartialTenant {
	static override EVENT_NAME = 'tenant.updated';
	readonly id: string;
	readonly key?: Nullable<string>;
	readonly name?: Nullable<string>;
	readonly updatedAt: Date;
	readonly updatedBy: string;

	constructor(tenant: PartialTenant) {
		super(TenantUpdatedEvent.EVENT_NAME, {
			aggregateId: tenant.id,
		});
		this.id = tenant.id;
		this.name = tenant.name;
		this.key = tenant.key;
		this.updatedAt = tenant.updatedAt;
		this.updatedBy = tenant.updatedBy;
	}

	static fromDomain(oldTenant: Tenant, newTenant: Tenant): TenantUpdatedEvent {
		return new TenantUpdatedEvent({
			id: newTenant.id.value,
			key: oldTenant.key.value === newTenant.key.value ? undefined : newTenant.key.value,
			name: oldTenant.name.value === newTenant.name.value ? undefined : newTenant.name.value,
			updatedAt: newTenant.updatedAt.value,
			updatedBy: newTenant.updatedBy.value,
		});
	}
}
