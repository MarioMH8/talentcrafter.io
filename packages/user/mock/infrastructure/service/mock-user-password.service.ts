import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import type { Nullable } from '@hexadrop/types/nullable';
import { UserPassword, UserPasswordService } from '@talentcrafter/user/domain';
import type { Mock } from 'bun:test';
import { jest } from 'bun:test';

export default class MockUserPasswordService extends UserPasswordService {
	checkSpy: Mock<(userPassword: Nullable<string>, inputPassword: Nullable<string>) => Either<DomainError, boolean>>;

	hashSpy: Mock<(password: string) => Either<DomainError, UserPassword>>;

	constructor() {
		super();
		this.checkSpy = jest.fn(() => Either.right(true));
		this.hashSpy = jest.fn(() => Either.right(new UserPassword('{noop}hashed')));
	}

	override check(userPassword: Nullable<string>, inputPassword: Nullable<string>): Either<DomainError, boolean> {
		return this.checkSpy(userPassword, inputPassword);
	}

	override hash(password: string): Either<DomainError, UserPassword> {
		return this.hashSpy(password);
	}

	withMockHash(password: string): void {
		this.hashSpy = jest.fn(() => Either.right(new UserPassword(password)));
	}
}
