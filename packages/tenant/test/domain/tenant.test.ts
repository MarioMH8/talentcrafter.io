import { Tenant } from '@talentcrafter/tenant/domain';
import { TenantKeyMother, TenantMother, TenantNameMother } from '@talentcrafter/tenant/mother/domain';
import { afterAll, beforeAll, describe, expect, setSystemTime, test } from 'bun:test';

describe('Tenant', () => {
	const date = new Date('1999-01-01T00:00:00.000Z');
	beforeAll(() => {
		setSystemTime(date);
	});
	afterAll(() => {
		setSystemTime();
	});
	test('should create a valid Tenant', () => {
		const tenant = TenantMother.random();
		expect(tenant).toBeInstanceOf(Tenant);
	});

	test('should create a Tenant with specific name', () => {
		const tenantName = TenantNameMother.random();
		const tenant = TenantMother.create({
			name: tenantName.value,
		});

		expect(tenant.name.value).toBe(tenantName.value);
	});

	test('should create a Tenant with specific key', () => {
		const tenantKey = TenantKeyMother.random();
		const tenant = TenantMother.create({
			key: tenantKey.value,
		});

		expect(tenant.key.value).toBe(tenantKey.value);
	});

	test('should return primitives', () => {
		const tenant = TenantMother.random();
		const primitives = tenant.toPrimitives();

		expect(primitives.id).toBe(tenant.id.value);
		expect(primitives.name).toBe(tenant.name.value);
	});

	describe('create', () => {
		test('should create a new Tenant', () => {
			const randomTenant = TenantMother.random();
			const parameters = {
				id: randomTenant.id.value,
				key: randomTenant.key.value,
				name: randomTenant.name.value,
			};
			const user = 'user-id';
			const result = Tenant.create(parameters, user);

			expect(result.isRight()).toBe(true);

			const created = result.getRight();

			expect(created.id.value).toBe(parameters.id);
			expect(created.key.value).toBe(parameters.key);
			expect(created.name.value).toBe(parameters.name);
			expect(created.createdBy.value).toBe(user);
			expect(created.createdAt.value).toStrictEqual(date);
			expect(created.updatedBy.value).toBe(user);
			expect(created.updatedAt.value).toStrictEqual(date);
			expect(created.deletedBy?.value).toBeUndefined();
			expect(created.deletedAt?.value).toBeUndefined();

			const events = created.pullDomainEvents();
			expect(events.length).toBe(1);
			expect(events[0]?.eventName).toBe('tenant.created');
		});
	});

	describe('update', () => {
		test('should update a Tenant', () => {
			const tenant = TenantMother.random();
			const newName = TenantNameMother.random();
			const user = 'user-id';

			const result = Tenant.update(tenant, { name: newName.value }, user);

			expect(result.isRight()).toBe(true);

			const updated = result.getRight();

			expect(updated.name.value).toBe(newName.value);
			expect(updated.createdBy.value).toBe(tenant.createdBy.value);
			expect(updated.createdAt.value).toBe(tenant.createdAt.value);
			expect(updated.updatedBy.value).toBe(user);
			expect(updated.updatedAt.value).toStrictEqual(date);
			expect(updated.deletedBy?.value).toBeUndefined();
			expect(updated.deletedAt?.value).toBeUndefined();

			const events = updated.pullDomainEvents();
			expect(events.length).toBe(1);
			expect(events[0]?.eventName).toBe('tenant.updated');
		});
	});

	describe('delete', () => {
		test('should delete a Tenant', () => {
			const tenant = TenantMother.random();
			const user = 'user-id';

			const result = Tenant.delete(tenant, user);

			expect(result.isRight()).toBe(true);

			const deleted = result.getRight();

			expect(deleted.createdBy.value).toBe(tenant.createdBy.value);
			expect(deleted.createdAt.value).toBe(tenant.createdAt.value);
			expect(deleted.updatedBy.value).toBe(tenant.updatedBy.value);
			expect(deleted.updatedAt.value).toBe(tenant.updatedAt.value);
			expect(deleted.deletedAt?.value).toStrictEqual(date);
			expect(deleted.deletedBy?.value).toBe(user);

			const events = deleted.pullDomainEvents();
			expect(events.length).toBe(1);
			expect(events[0]?.eventName).toBe('tenant.deleted');
		});
	});
});
