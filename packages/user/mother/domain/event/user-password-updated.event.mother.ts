import { UserPasswordUpdatedEvent } from '@talentcrafter/user/domain';
import { UserMother } from '@talentcrafter/user/mother/domain';

interface PartialUser {
	id: string;
	updatedAt: Date;
	updatedBy: string;
}

export default class UserPasswordUpdatedEventMother {
	static create(user: PartialUser): UserPasswordUpdatedEvent {
		return new UserPasswordUpdatedEvent(user);
	}

	static random(): UserPasswordUpdatedEvent {
		const user = UserMother.random();

		return this.create({
			id: user.id.value,
			updatedAt: user.updatedAt.value,
			updatedBy: user.updatedBy.value,
		});
	}
}
