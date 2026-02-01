import type { PartialNullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';
import { User, UserUpdatedEvent } from '@talentcrafter/user/domain';
import { UserMother } from '@talentcrafter/user/mother/domain';

interface PartialUser extends PartialNullable<Primitives<User>> {
	id: string;
	updatedAt: Date;
	updatedBy: string;
}

export default class UserUpdatedEventMother {
	static create(user: PartialUser): UserUpdatedEvent {
		return new UserUpdatedEvent(user);
	}

	static random(): UserUpdatedEvent {
		const oldUser = UserMother.random();
		const newUser = UserMother.create({ id: oldUser.id.value });

		return this.create({
			email: oldUser.email.value === newUser.email.value ? undefined : newUser.email.value,
			id: newUser.id.value,
			updatedAt: newUser.updatedAt.value,
			updatedBy: newUser.updatedBy.value,
		});
	}
}
