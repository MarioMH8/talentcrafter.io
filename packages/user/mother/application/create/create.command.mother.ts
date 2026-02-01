import { faker } from '@faker-js/faker';
import type { CommandConstructorParameters } from '@hexadrop/command';
import { TalentCrafterIdMother } from '@talentcrafter/aggregate-root/mother/domain';
import { CreateUserCommand } from '@talentcrafter/user/application';
import { UserEmailMother, UserPasswordMother } from '@talentcrafter/user/mother/domain';

export default class CreateUserCommandMother {
	static create(parameters: Partial<CommandConstructorParameters<CreateUserCommand>> = {}): CreateUserCommand {
		return new CreateUserCommand({
			creator: parameters.creator ?? faker.internet.username(),
			email: parameters.email ?? UserEmailMother.random().value,
			id: parameters.id ?? TalentCrafterIdMother.random().value,
			password: parameters.password ?? UserPasswordMother.random().value,
		});
	}

	static random(): CreateUserCommand {
		return this.create();
	}
}
