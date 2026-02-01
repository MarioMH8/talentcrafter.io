import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import type { Nullable } from '@hexadrop/types/nullable';
import { UserPassword, UserPasswordService } from '@talentcrafter/user/domain';
import type { Mock } from 'bun:test';
import { expect, jest } from 'bun:test';

export default class MockUserPasswordService extends UserPasswordService {
	checkSpy: Mock<(userPassword: Nullable<string>, inputPassword: Nullable<string>) => Either<DomainError, boolean>>;

	hashSpy: Mock<(password: string) => Either<DomainError, UserPassword>>;

	constructor() {
		super();
		this.checkSpy = jest.fn(() => Either.right(true));
		this.hashSpy = jest.fn(() => Either.right(new UserPassword('{noop}hashed')));
	}

	assertHashIsNotCall(): void {
		const publishSpyCalls = this.hashSpy.mock.calls;
		expect(publishSpyCalls.length).toStrictEqual(0);
	}

	assertLastHash(password: string): void {
		const spyCalls = this.hashSpy.mock.calls;

		expect(spyCalls.length).toStrictEqual(1);

		const lastSpyCall = spyCalls.at(-1);
		expect(lastSpyCall).toStrictEqual([password]);
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
