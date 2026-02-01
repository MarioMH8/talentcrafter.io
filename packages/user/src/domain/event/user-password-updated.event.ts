import DomainEvent from '@hexadrop/event';

import type User from '../user';

interface PartialUser {
	id: string;
	updatedAt: Date;
	updatedBy: string;
}

export default class UserPasswordUpdatedEvent extends DomainEvent implements PartialUser {
	static override EVENT_NAME = 'user.password-updated';
	readonly id: string;
	readonly updatedAt: Date;
	readonly updatedBy: string;

	constructor(user: PartialUser) {
		super(UserPasswordUpdatedEvent.EVENT_NAME, {
			aggregateId: user.id,
		});
		this.id = user.id;
		this.updatedAt = user.updatedAt;
		this.updatedBy = user.updatedBy;
	}

	static fromDomain(user: User): UserPasswordUpdatedEvent {
		return new UserPasswordUpdatedEvent({
			id: user.id.value,
			updatedAt: user.updatedAt.value,
			updatedBy: user.updatedBy.value,
		});
	}
}
