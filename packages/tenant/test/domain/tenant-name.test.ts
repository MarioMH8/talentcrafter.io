import { TenantName, TenantNameError } from '@talentcrafter/tenant/domain';
import { TenantNameMother } from '@talentcrafter/tenant/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('TenantName', () => {
	test('should create a valid TenantName', () => {
		const value = TenantNameMother.random();
		expect(value).toBeInstanceOf(TenantName);
	});

	test('should create a TenantName with a specific value', () => {
		const expectedValue = 'Acme Corp';
		const tenantName = TenantNameMother.create(expectedValue);
		expect(tenantName.value).toBe(expectedValue);
	});

	test('should throw error if name is empty', () => {
		expect(() => new TenantName('')).toThrow(TenantNameError);
	});

	test('should throw error if name is too short', () => {
		expect(() => new TenantName('ab')).toThrow(TenantNameError);
	});

	test('should throw error if name is too long', () => {
		const longName = 'a'.repeat(201);
		expect(() => new TenantName(longName)).toThrow(TenantNameError);
	});
});
