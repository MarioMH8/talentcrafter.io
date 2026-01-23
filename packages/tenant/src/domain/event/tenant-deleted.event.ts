import DomainEvent from '@hexadrop/event';

import type Tenant from '../tenant';

interface PartialTenant {
	deletedAt: Date;
	deletedBy: string;
	id: string;
}

export default class TenantDeletedEvent extends DomainEvent implements PartialTenant {
	static override EVENT_NAME = 'tenant.deleted';
	readonly deletedAt: Date;
	readonly deletedBy: string;
	readonly id: string;

	constructor(tenant: PartialTenant) {
		super(TenantDeletedEvent.EVENT_NAME, {
			aggregateId: tenant.id,
		});
		this.id = tenant.id;
		this.deletedAt = tenant.deletedAt;
		this.deletedBy = tenant.deletedBy;
	}

	static fromDomain(tenant: Tenant, deletedBy: string, deletedAt: Date): TenantDeletedEvent {
		return new TenantDeletedEvent({
			deletedAt,
			deletedBy,
			id: tenant.id.value,
		});
	}
}
