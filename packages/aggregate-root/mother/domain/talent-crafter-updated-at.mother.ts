import { faker } from '@faker-js/faker';
import { TalentCrafterUpdatedAt } from '@talentcrafter/aggregate-root/domain';

export default class TalentCrafterUpdatedAtMother {
	static create(value?: Date): TalentCrafterUpdatedAt {
		return new TalentCrafterUpdatedAt(value ?? faker.date.soon());
	}

	static random(): TalentCrafterUpdatedAt {
		return this.create();
	}
}
