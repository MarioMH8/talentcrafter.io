import Either from '@hexadrop/either';
import type DomainError from '@hexadrop/error';
import type { Nullable } from '@hexadrop/types/nullable';
import type {
	FindUserCriteria,
	SearchUserCriteria,
	UserRepositoryDeleteParameters,
	UserRepositoryDeleteReturn,
	UserRepositoryFindByEmailParameters,
	UserRepositoryFindByIdParameters,
	UserRepositoryFindReturn,
	UserRepositorySearchParameters,
	UserRepositorySearchReturn,
	UserRepositoryUpsertParameters,
	UserRepositoryUpsertReturn,
} from '@talentcrafter/user/domain';
import { FindUserByEmailCriteria, FindUserByIdCriteria, User, UserRepository } from '@talentcrafter/user/domain';
import type { Mock } from 'bun:test';
import { expect, jest } from 'bun:test';

export default class MockUserRepository implements UserRepository {
	deleteSpy: Mock<(...parameters: UserRepositoryDeleteParameters) => UserRepositoryDeleteReturn>;
	findByEmailSpy: Mock<(...parameters: UserRepositoryFindByEmailParameters) => UserRepositoryFindReturn>;
	findByIdSpy: Mock<(...parameters: UserRepositoryFindByIdParameters) => UserRepositoryFindReturn>;
	searchSpy: Mock<(...parameters: UserRepositorySearchParameters) => UserRepositorySearchReturn>;
	upsertSpy: Mock<(...parameters: UserRepositoryUpsertParameters) => UserRepositoryUpsertReturn>;

	constructor() {
		this.findByIdSpy = jest.fn();
		this.findByEmailSpy = jest.fn();
		this.searchSpy = jest.fn();
		this.upsertSpy = jest.fn(() => Either.right());
		this.deleteSpy = jest.fn(() => Either.right());
	}

	assertDeleteIsNotCall(): void {
		const spyCalls = this.deleteSpy.mock.calls;

		expect(spyCalls.length).toStrictEqual(0);
	}

	assertFindByEmailIsNotCall(): void {
		const publishSpyCalls = this.findByEmailSpy.mock.calls;
		expect(publishSpyCalls.length).toStrictEqual(0);
	}

	assertFindByIdIsNotCall(): void {
		const publishSpyCalls = this.findByIdSpy.mock.calls;
		expect(publishSpyCalls.length).toStrictEqual(0);
	}

	assertFindIsNotCall(): void {
		const assertions = [() => this.assertFindByEmailIsNotCall(), () => this.assertFindByIdIsNotCall()];
		for (const assert of assertions) {
			assert();
		}
	}

	assertLastDeletedAre(...users: User[]): void {
		const spyCalls = this.deleteSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThanOrEqual(1);

		const lastSpyCall = spyCalls.at(-1);
		expect(lastSpyCall).toBeDefined();
		if (!lastSpyCall) {
			return;
		}

		expect(users.map(user => user.toPrimitives())).toMatchObject(lastSpyCall.map(user => user.toPrimitives()));
	}

	assertLastFind(criteria: FindUserCriteria): void {
		if (criteria instanceof FindUserByIdCriteria) {
			this.assertLastFindByIdIs(criteria);
		}
		if (criteria instanceof FindUserByEmailCriteria) {
			this.assertLastFindByEmailIs(criteria);
		}
	}

	assertLastFinds(criteriaArray: FindUserCriteria[]): void {
		for (const criteria of criteriaArray) {
			this.assertLastFind(criteria);
		}
	}

	assertLastSearch(criteria: SearchUserCriteria): void {
		const spyCalls = this.searchSpy.mock.calls;

		expect(spyCalls.length).toStrictEqual(1);

		const lastSpyCall = spyCalls.at(-1);
		expect(lastSpyCall).toStrictEqual([criteria]);
	}

	assertLastUpsertAre(...users: User[]): void {
		const spyCalls = this.upsertSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThanOrEqual(1);

		const lastSpyCall = spyCalls.at(-1);
		expect(lastSpyCall).toBeDefined();
		if (!lastSpyCall) {
			return;
		}

		expect(users.map(user => user.toPrimitives())).toMatchObject(lastSpyCall.map(user => user.toPrimitives()));
	}

	assertSearchIsNotCall(): void {
		const spyCalls = this.searchSpy.mock.calls;

		expect(spyCalls.length).toStrictEqual(0);
	}

	assertUpsertIsNotCall(): void {
		const publishSpyCalls = this.upsertSpy.mock.calls;
		expect(publishSpyCalls.length).toStrictEqual(0);
	}

	delete(users: User): UserRepositoryDeleteReturn {
		return this.deleteSpy(users);
	}

	find(criteria: FindUserCriteria): UserRepositoryFindReturn {
		if (criteria instanceof FindUserByIdCriteria) {
			return this.findById(criteria);
		}

		return this.findByEmail(criteria);
	}

	search(criteria: SearchUserCriteria): UserRepositorySearchReturn {
		return this.searchSpy(criteria);
	}

	upsert(users: User): UserRepositoryUpsertReturn {
		return this.upsertSpy(users);
	}

	withMockDeleteError(error: DomainError): void {
		this.deleteSpy = jest.fn(() => Either.left(error));
	}

	withMockFind(user: Nullable<User>, criteria: FindUserCriteria): void {
		if (criteria instanceof FindUserByIdCriteria) {
			this.withMockFindById(user);
		}

		this.withMockFindByEmail(user);
	}

	withMockFindError(error: DomainError, criteria: FindUserCriteria): void {
		if (criteria instanceof FindUserByIdCriteria) {
			this.withMockFindByIdError(error);
		}
		this.withMockFindByEmailError(error);
	}

	withMockSearch(...users: User[]): void {
		this.searchSpy = jest.fn(() => Either.right([users, users.length]));
	}

	withMockSearchError(error: DomainError): void {
		this.searchSpy = jest.fn(() => Either.left(error));
	}

	withMockUpsertError(error: DomainError): void {
		this.upsertSpy = jest.fn(() => Either.left(error));
	}

	private assertLastFindByEmailIs(criteria: FindUserByEmailCriteria): void {
		const spyCalls = this.findByEmailSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThanOrEqual(1);

		const lastSpyCall = spyCalls.at(-1);
		expect(lastSpyCall).toBeDefined();
		if (!lastSpyCall) {
			return;
		}

		const lastFindByEmail = lastSpyCall[0];

		expect(criteria).toMatchObject(lastFindByEmail);
	}

	private assertLastFindByIdIs(criteria: FindUserByIdCriteria): void {
		const spyCalls = this.findByIdSpy.mock.calls;

		expect(spyCalls.length).toBeGreaterThanOrEqual(1);

		const lastSpyCall = spyCalls.at(-1);
		expect(lastSpyCall).toBeDefined();
		if (!lastSpyCall) {
			return;
		}

		const lastFindById = lastSpyCall[0];

		expect(criteria).toMatchObject(lastFindById);
	}

	private findByEmail(criteria: FindUserByEmailCriteria): UserRepositoryFindReturn {
		return this.findByEmailSpy(criteria);
	}

	private findById(criteria: FindUserByIdCriteria): UserRepositoryFindReturn {
		return this.findByIdSpy(criteria);
	}

	private withMockFindByEmail(user: Nullable<User>): void {
		this.findByEmailSpy = jest.fn(() => Either.right(user));
	}

	private withMockFindByEmailError(error: DomainError): void {
		this.findByEmailSpy = jest.fn(() => Either.left(error));
	}

	private withMockFindById(user: Nullable<User>): void {
		this.findByIdSpy = jest.fn(() => Either.right(user));
	}

	private withMockFindByIdError(error: DomainError): void {
		this.findByIdSpy = jest.fn(() => Either.left(error));
	}
}
