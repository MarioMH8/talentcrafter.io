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
		const password = () => new UserPassword('');
		expect(password).toThrow(UserPasswordError);
		expect(password).toThrow('User password is required');
	});

	test('should throw error if password is too short', () => {
		const password = () => new UserPassword('Ab1!');
		expect(password).toThrow(UserPasswordError);
		expect(password).toThrow('User password must be at least 8 characters');
	});

	test('should throw error if password does not contain uppercase', () => {
		const password = () => new UserPassword('password123!');
		expect(password).toThrow(UserPasswordError);
		expect(password).toThrow('User password must contain at least one uppercase letter');
	});

	test('should throw error if password does not contain lowercase', () => {
		const password = () => new UserPassword('PASSWORD123!');
		expect(password).toThrow(UserPasswordError);
		expect(password).toThrow('User password must contain at least one lowercase letter');
	});

	test('should throw error if password does not contain number', () => {
		const password = () => new UserPassword('Password!');
		expect(password).toThrow(UserPasswordError);
		expect(password).toThrow('User password must contain at least one number');
	});

	test('should throw error if password does not contain special character', () => {
		const password = () => new UserPassword('Password123');
		expect(password).toThrow(UserPasswordError);
		expect(password).toThrow('User password must contain at least one special character');
	});

	describe('isSecure', () => {
		test('should return true for valid password', () => {
			expect(UserPassword.isSecure('Password123!')).toBe(true);
		});

		test('should return false if password is too short', () => {
			expect(UserPassword.isSecure('Ab1!')).toBe(false);
		});

		test('should return false if password does not contain uppercase', () => {
			expect(UserPassword.isSecure('password123!')).toBe(false);
		});

		test('should return false if password does not contain lowercase', () => {
			expect(UserPassword.isSecure('PASSWORD123!')).toBe(false);
		});

		test('should return false if password does not contain number', () => {
			expect(UserPassword.isSecure('Password!')).toBe(false);
		});

		test('should return false if password does not contain special character', () => {
			expect(UserPassword.isSecure('Password123')).toBe(false);
		});
	});

	describe('isValid', () => {
		test('should return true for valid secure password', () => {
			expect(UserPassword.isValid('Password123!')).toBe(true);
		});

		test('should return true for encrypted password', () => {
			expect(UserPassword.isValid('{bcrypt}$2a$10$X5')).toBe(true);
		});

		test('should return false for empty password', () => {
			expect(UserPassword.isValid('')).toBe(false);
		});

		test('should return false for insecure password', () => {
			expect(UserPassword.isValid('weak')).toBe(false);
		});
	});

	describe('isEncrypted', () => {
		test('should return true if password is encrypted', () => {
			const encryptedPassword = '{bcrypt}$2a$10$X5';
			const userPassword = new UserPassword(encryptedPassword);
			expect(userPassword.isEncrypted()).toBe(true);
		});

		test('should return false if password is not encrypted', () => {
			const plainPassword = 'Password123!';
			const userPassword = new UserPassword(plainPassword);
			expect(userPassword.isEncrypted()).toBe(false);
		});
	});

	describe('random', () => {
		test('should generate a valid secure password', () => {
			const password = UserPassword.random();
			expect(UserPassword.isSecure(password)).toBe(true);
		});

		test('should generate different passwords', () => {
			const passwordA = UserPassword.random();
			const passwordB = UserPassword.random();
			expect(passwordA).not.toBe(passwordB);
		});
	});
});
