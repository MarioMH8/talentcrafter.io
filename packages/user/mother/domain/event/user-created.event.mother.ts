import type { Primitives } from '@hexadrop/types/primitives';
import { User, UserCreatedEvent } from '@talentcrafter/user/domain';
import { UserMother } from '@talentcrafter/user/mother/domain';

export default class UserCreatedEventMother {
	static create(user: Primitives<User>): UserCreatedEvent {
		return new UserCreatedEvent(user);
	}

	static random(): UserCreatedEvent {
		const user = UserMother.random();

		return this.create(user.toPrimitives());
	}
}
