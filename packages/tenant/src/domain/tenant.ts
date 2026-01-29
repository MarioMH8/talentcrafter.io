import Either from '@hexadrop/either';
import DomainError from '@hexadrop/error';
import type { Primitives } from '@hexadrop/types/primitives';
import { TalentCrafterAggregateRoot } from '@talentcrafter/aggregate-root/domain';

import { TenantCreatedEvent, TenantDeletedEvent, TenantUpdatedEvent } from './event';
import TenantKey from './tenant-key';
import TenantName from './tenant-name';

type TenantCreateParameters = Pick<Primitives<Tenant>, 'id' | 'key' | 'name'>;
type TenantUpdateParameters = Partial<Pick<Primitives<Tenant>, 'key' | 'name'>>;

export default class Tenant extends TalentCrafterAggregateRoot {
	readonly key: TenantKey;
	readonly name: TenantName;

	constructor(primitives: Primitives<Tenant>) {
		super(primitives);
		const { key, name } = primitives;
		this.name = new TenantName(name);
		this.key = new TenantKey(key);
	}

	static create(tenant: TenantCreateParameters, user: string): Either<DomainError, Tenant> {
		try {
			const created = new Tenant({
				...tenant,
				createdAt: new Date(),
				createdBy: user,
				deletedAt: undefined,
				deletedBy: undefined,
				updatedAt: new Date(),
				updatedBy: user,
			});
			created.record(TenantCreatedEvent.fromDomain(created));

			return Either.right(created);
		} catch (error) {
			if (error instanceof DomainError) {
				return Either.left(error);
			}
			throw error;
		}
	}

	static delete(tenant: Tenant, user: string): Either<DomainError, Tenant> {
		try {
			const deletedAt = new Date();
			const deletedBy = user;

			const deleted = new Tenant({
				...tenant.toPrimitives(),
				deletedAt,
				deletedBy,
			});
			deleted.record(TenantDeletedEvent.fromDomain(deleted, deletedBy, deletedAt));

			return Either.right(deleted);
		} catch (error) {
			if (error instanceof DomainError) {
				return Either.left(error);
			}
			throw error;
		}
	}

	static update(tenant: Tenant, parameters: TenantUpdateParameters, user: string): Either<DomainError, Tenant> {
		try {
			const updated = new Tenant({
				...tenant.toPrimitives(),
				createdAt: tenant.createdAt.value,
				createdBy: tenant.createdBy.value,
				deletedAt: undefined,
				deletedBy: undefined,
				key: parameters.key ?? tenant.key.value,
				name: parameters.name ?? tenant.name.value,
				updatedAt: new Date(),
				updatedBy: user,
			});
			updated.record(TenantUpdatedEvent.fromDomain(tenant, updated));

			return Either.right(updated);
		} catch (error) {
			if (error instanceof DomainError) {
				return Either.left(error);
			}
			throw error;
		}
	}

	override toPrimitives(): Primitives<Tenant> {
		return {
			...super.toPrimitives(),
			key: this.key.value,
			name: this.name.value,
		};
	}
}
