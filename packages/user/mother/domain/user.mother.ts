import type { PartialNullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';
import { TalentCrafterAggregateRootMother } from '@talentcrafter/aggregate-root/mother/domain';
import { CreateUserCommand } from '@talentcrafter/user/application';
import { User } from '@talentcrafter/user/domain';

import UserEmailMother from './user-email.mother';
import UserPasswordMother from './user-password.mother';

export default class UserMother {
	static create({ email, password, ...rest }: PartialNullable<Primitives<User>> = {}): User {
		return new User({
			...TalentCrafterAggregateRootMother.create(rest),
			email: email ?? UserEmailMother.random().value,
			password: password ?? UserPasswordMother.random().value,
		});
	}

	static fromCommand(command: CreateUserCommand, override: PartialNullable<Primitives<User>> = {}): User {
		return this.create({
			createdBy: command.creator,
			email: command.email,
			id: command.id,
			password: command.password,
			updatedBy: command.creator,
			...override,
		});
	}

	static random(): User {
		return this.create();
	}
}
