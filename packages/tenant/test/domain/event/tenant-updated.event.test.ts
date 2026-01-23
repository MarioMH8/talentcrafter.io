import { TenantUpdatedEvent } from '@talentcrafter/tenant/domain';
import { TenantMother } from '@talentcrafter/tenant/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('TenantUpdatedEvent', () => {
	test('should create a valid TenantUpdatedEvent', () => {
		const oldTenant = TenantMother.random();
		const newTenant = TenantMother.create({ id: oldTenant.id.value });
		const event = TenantUpdatedEvent.fromDomain(oldTenant, newTenant);

		expect(event).toBeInstanceOf(TenantUpdatedEvent);
		expect(event.eventName).toBe('tenant.updated');
		expect(event.aggregateId).toBe(newTenant.id.value);
		expect(event.id).toBe(newTenant.id.value);
		expect(event.updatedAt).toBe(newTenant.updatedAt.value);
		expect(event.updatedBy).toBe(newTenant.updatedBy.value);
	});

	test('should include changed name', () => {
		const oldTenant = TenantMother.random();
		const newTenant = TenantMother.create({ id: oldTenant.id.value, name: 'New Name' });
		const event = TenantUpdatedEvent.fromDomain(oldTenant, newTenant);

		expect(event.name).toBe(newTenant.name.value);
	});

	test('should not include unchanged name', () => {
		const oldTenant = TenantMother.random();
		const newTenant = TenantMother.create({ id: oldTenant.id.value, name: oldTenant.name.value });
		const event = TenantUpdatedEvent.fromDomain(oldTenant, newTenant);

		expect(event.name).toBeUndefined();
	});
});
