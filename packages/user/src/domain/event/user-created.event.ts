import DomainEvent from '@hexadrop/event';
import type { Primitives } from '@hexadrop/types/primitives';

import type User from '../user';

export default class UserCreatedEvent extends DomainEvent implements Primitives<User> {
	static override EVENT_NAME = 'user.created';
	readonly createdAt: Date;
	readonly createdBy: string;
	readonly email: string;
	readonly id: string;
	readonly updatedAt: Date;
	readonly updatedBy: string;

	constructor(user: Primitives<User>) {
		super(UserCreatedEvent.EVENT_NAME, {
			aggregateId: user.id,
		});
		this.id = user.id;
		this.email = user.email;
		this.createdAt = user.createdAt;
		this.createdBy = user.createdBy;
		this.updatedAt = user.updatedAt;
		this.updatedBy = user.updatedBy;
	}

	static fromDomain(user: User): UserCreatedEvent {
		return new UserCreatedEvent(user.toPrimitives());
	}
}
