import { faker } from '@faker-js/faker';
import { TalentCrafterDeletedAt } from '@talentcrafter/aggregate-root/domain';

export default class TalentCrafterDeletedAtMother {
	static create(value?: Date): TalentCrafterDeletedAt {
		return new TalentCrafterDeletedAt(value ?? faker.date.soon());
	}

	static random(): TalentCrafterDeletedAt {
		return this.create();
	}
}
