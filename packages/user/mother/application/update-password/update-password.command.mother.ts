import { faker } from '@faker-js/faker';
import type { CommandConstructorParameters } from '@hexadrop/command';
import { TalentCrafterIdMother } from '@talentcrafter/aggregate-root/mother/domain';
import { UpdateUserPasswordCommand } from '@talentcrafter/user/application';
import { UserPasswordMother } from '@talentcrafter/user/mother/domain';

export default class UpdateUserPasswordCommandMother {
	static create(
		parameters: Partial<CommandConstructorParameters<UpdateUserPasswordCommand>> = {}
	): UpdateUserPasswordCommand {
		return new UpdateUserPasswordCommand({
			id: parameters.id ?? TalentCrafterIdMother.random().value,
			password: parameters.password ?? UserPasswordMother.random().value,
			updater: parameters.updater ?? faker.internet.username(),
		});
	}

	static random(): UpdateUserPasswordCommand {
		return this.create();
	}
}
