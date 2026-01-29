import DomainEvent from '@hexadrop/event';
import type { Nullable, PartialNullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';

import type User from '../user';

interface PartialUser extends PartialNullable<Primitives<User>> {
	id: string;
	updatedAt: Date;
	updatedBy: string;
}

export default class UserUpdatedEvent extends DomainEvent implements PartialUser {
	static override EVENT_NAME = 'user.updated';
	readonly email?: Nullable<string>;
	readonly id: string;
	readonly updatedAt: Date;
	readonly updatedBy: string;

	constructor(user: PartialUser) {
		super(UserUpdatedEvent.EVENT_NAME, {
			aggregateId: user.id,
		});
		this.id = user.id;
		this.email = user.email;
		this.updatedAt = user.updatedAt;
		this.updatedBy = user.updatedBy;
	}

	static fromDomain(oldUser: User, newUser: User): UserUpdatedEvent {
		return new UserUpdatedEvent({
			email: oldUser.email.value === newUser.email.value ? undefined : newUser.email.value,
			id: newUser.id.value,
			updatedAt: newUser.updatedAt.value,
			updatedBy: newUser.updatedBy.value,
		});
	}
}
