import { TenantKey, TenantKeyError } from '@talentcrafter/tenant/domain';
import { TenantKeyMother } from '@talentcrafter/tenant/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('TenantKey', () => {
	test('should create a valid TenantKey', () => {
		const value = TenantKeyMother.random();
		expect(value).toBeInstanceOf(TenantKey);
	});

	test('should create a TenantKey with a specific value', () => {
		const expectedValue = 'talent-crafter';
		const TenantKey = TenantKeyMother.create(expectedValue);
		expect(TenantKey.value).toBe(expectedValue);
	});

	test('should throw error if name is empty', () => {
		expect(() => new TenantKey('')).toThrow(TenantKeyError);
	});

	test('should throw error if name is too short', () => {
		expect(() => new TenantKey('ab')).toThrow(TenantKeyError);
	});

	test('should throw error if name is too long', () => {
		const longName = 'a'.repeat(51);
		expect(() => new TenantKey(longName)).toThrow(TenantKeyError);
	});

	test('should throw error if name has not correct format', () => {
		const incorrect = 'talent@crafter';
		expect(() => new TenantKey(incorrect)).toThrow(TenantKeyError);
	});
});
