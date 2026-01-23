import DomainEvent from '@hexadrop/event';
import type { Primitives } from '@hexadrop/types/primitives';

import type Tenant from '../tenant';

export default class TenantCreatedEvent extends DomainEvent implements Primitives<Tenant> {
	static override EVENT_NAME = 'tenant.created';
	readonly createdAt: Date;
	readonly createdBy: string;
	readonly id: string;
	readonly key: string;
	readonly name: string;
	readonly updatedAt: Date;
	readonly updatedBy: string;

	constructor(tenant: Primitives<Tenant>) {
		super(TenantCreatedEvent.EVENT_NAME, {
			aggregateId: tenant.id,
		});
		this.id = tenant.id;
		this.name = tenant.name;
		this.key = tenant.key;
		this.createdAt = tenant.createdAt;
		this.createdBy = tenant.createdBy;
		this.updatedAt = tenant.updatedAt;
		this.updatedBy = tenant.updatedBy;
	}

	static fromDomain(tenant: Tenant): TenantCreatedEvent {
		return new TenantCreatedEvent(tenant.toPrimitives());
	}
}
