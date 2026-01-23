import { TenantCreatedEvent } from '@talentcrafter/tenant/domain';
import { TenantMother } from '@talentcrafter/tenant/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('TenantCreatedEvent', () => {
	test('should create a valid TenantCreatedEvent', () => {
		const tenant = TenantMother.random();
		const event = TenantCreatedEvent.fromDomain(tenant);

		expect(event).toBeInstanceOf(TenantCreatedEvent);
		expect(event.eventName).toBe('tenant.created');
		expect(event.aggregateId).toBe(tenant.id.value);
		expect(event.id).toBe(tenant.id.value);
		expect(event.name).toBe(tenant.name.value);
		expect(event.createdAt).toBe(tenant.createdAt.value);
		expect(event.createdBy).toBe(tenant.createdBy.value);
		expect(event.updatedAt).toBe(tenant.updatedAt.value);
		expect(event.updatedBy).toBe(tenant.updatedBy.value);
	});
});
