import DomainEvent from '@hexadrop/event';

import type User from '../user';

interface PartialUser {
	deletedAt: Date;
	deletedBy: string;
	id: string;
}

export default class UserDeletedEvent extends DomainEvent implements PartialUser {
	static override EVENT_NAME = 'user.deleted';
	readonly deletedAt: Date;
	readonly deletedBy: string;
	readonly id: string;

	constructor(user: PartialUser) {
		super(UserDeletedEvent.EVENT_NAME, {
			aggregateId: user.id,
		});
		this.id = user.id;
		this.deletedAt = user.deletedAt;
		this.deletedBy = user.deletedBy;
	}

	static fromDomain(user: User, deletedBy: string, deletedAt: Date): UserDeletedEvent {
		return new UserDeletedEvent({
			deletedAt,
			deletedBy,
			id: user.id.value,
		});
	}
}
