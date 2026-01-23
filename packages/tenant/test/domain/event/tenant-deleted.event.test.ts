import {
	TalentCrafterDeletedAtMother,
	TalentCrafterDeletedByMother,
} from '@talentcrafter/aggregate-root/mother/domain';
import { TenantDeletedEvent } from '@talentcrafter/tenant/domain';
import { TenantMother } from '@talentcrafter/tenant/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('TenantDeletedEvent', () => {
	test('should create a valid TenantDeletedEvent', () => {
		const tenant = TenantMother.random();
		const deletedBy = TalentCrafterDeletedByMother.random().value;
		const deletedAt = TalentCrafterDeletedAtMother.random().value;
		const event = TenantDeletedEvent.fromDomain(tenant, deletedBy, deletedAt);

		expect(event).toBeInstanceOf(TenantDeletedEvent);
		expect(event.eventName).toBe('tenant.deleted');
		expect(event.aggregateId).toBe(tenant.id.value);
		expect(event.id).toBe(tenant.id.value);
		expect(event.deletedAt).toBe(deletedAt);
		expect(event.deletedBy).toBe(deletedBy);
	});
});
