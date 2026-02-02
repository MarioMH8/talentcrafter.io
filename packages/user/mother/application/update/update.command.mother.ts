import { faker } from '@faker-js/faker';
import type { CommandConstructorParameters } from '@hexadrop/command';
import { TalentCrafterIdMother } from '@talentcrafter/aggregate-root/mother/domain';
import { UpdateUserCommand } from '@talentcrafter/user/application';
import { UserEmailMother } from '@talentcrafter/user/mother/domain';

export default class UpdateUserCommandMother {
	static create(parameters: Partial<CommandConstructorParameters<UpdateUserCommand>> = {}): UpdateUserCommand {
		return new UpdateUserCommand({
			email: parameters.email ?? UserEmailMother.random().value,
			id: parameters.id ?? TalentCrafterIdMother.random().value,
			updater: parameters.updater ?? faker.internet.username(),
		});
	}

	static random(): UpdateUserCommand {
		return this.create();
	}
}
