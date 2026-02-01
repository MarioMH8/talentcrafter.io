import {
	TalentCrafterDeletedAtMother,
	TalentCrafterDeletedByMother,
} from '@talentcrafter/aggregate-root/mother/domain';
import { UserDeletedEvent } from '@talentcrafter/user/domain';
import { UserMother } from '@talentcrafter/user/mother/domain';

interface PartialUser {
	deletedAt: Date;
	deletedBy: string;
	id: string;
}

export default class UserDeletedEventMother {
	static create(user: PartialUser): UserDeletedEvent {
		return new UserDeletedEvent(user);
	}

	static random(): UserDeletedEvent {
		const user = UserMother.random();
		const deletedBy = TalentCrafterDeletedByMother.random().value;
		const deletedAt = TalentCrafterDeletedAtMother.random().value;

		return this.create({
			deletedAt,
			deletedBy,
			id: user.id.value,
		});
	}
}
