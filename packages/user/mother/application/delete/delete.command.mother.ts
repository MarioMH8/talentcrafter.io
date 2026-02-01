import { faker } from '@faker-js/faker';
import type { CommandConstructorParameters } from '@hexadrop/command';
import { TalentCrafterIdMother } from '@talentcrafter/aggregate-root/mother/domain';
import { DeleteUserCommand } from '@talentcrafter/user/application';

export default class DeleteUserCommandMother {
	static create(parameters: Partial<CommandConstructorParameters<DeleteUserCommand>> = {}): DeleteUserCommand {
		return new DeleteUserCommand({
			deleter: parameters.deleter ?? faker.internet.username(),
			id: parameters.id ?? TalentCrafterIdMother.random().value,
		});
	}

	static random(): DeleteUserCommand {
		return this.create();
	}
}
