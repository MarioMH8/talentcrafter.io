import { faker } from '@faker-js/faker';
import { TalentCrafterCreatedAt } from '@talentcrafter/aggregate-root/domain';

export default class TalentCrafterCreatedAtMother {
	static create(value?: Date): TalentCrafterCreatedAt {
		return new TalentCrafterCreatedAt(value ?? faker.date.soon());
	}

	static random(): TalentCrafterCreatedAt {
		return this.create();
	}
}
