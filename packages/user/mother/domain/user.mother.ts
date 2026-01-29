import type { PartialNullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';
import { TalentCrafterAggregateRootMother } from '@talentcrafter/aggregate-root/mother/domain';
import { User } from '@talentcrafter/user/domain';

import UserEmailMother from './user-email.mother';

export default class UserMother {
	static create({ email, ...rest }: PartialNullable<Primitives<User>> = {}): User {
		return new User({
			...TalentCrafterAggregateRootMother.create(rest),
			email: email ?? UserEmailMother.random().value,
		});
	}

	static random(): User {
		return this.create();
	}
}
