import { UserPassword, UserPasswordError } from '@talentcrafter/user/domain';
import { UserPasswordMother } from '@talentcrafter/user/mother/domain';
import { describe, expect, test } from 'bun:test';

describe('UserPassword', () => {
	test('should create a valid UserPassword', () => {
		const value = UserPasswordMother.random();
		expect(value).toBeInstanceOf(UserPassword);
	});

	test('should create a UserPassword with a specific value', () => {
		const expectedValue = 'Password123!';
		const userPassword = UserPasswordMother.create(expectedValue);
		expect(userPassword.value).toBe(expectedValue);
	});

	test('should throw error if password is empty', () => {
		expect(() => new UserPassword('')).toThrow(UserPasswordError);
	});

	test('should throw error if password is too short', () => {
		expect(() => new UserPassword('Ab1!')).toThrow(UserPasswordError);
	});

	test('should throw error if password does not contain uppercase', () => {
		expect(() => new UserPassword('password123!')).toThrow(UserPasswordError);
	});

	test('should throw error if password does not contain lowercase', () => {
		expect(() => new UserPassword('PASSWORD123!')).toThrow(UserPasswordError);
	});

	test('should throw error if password does not contain number', () => {
		expect(() => new UserPassword('Password!')).toThrow(UserPasswordError);
	});

	test('should throw error if password does not contain special character', () => {
		expect(() => new UserPassword('Password123')).toThrow(UserPasswordError);
	});
});
