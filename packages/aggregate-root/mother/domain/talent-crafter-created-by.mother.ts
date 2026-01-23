import { faker } from '@faker-js/faker';
import { TalentCrafterCreatedBy } from '@talentcrafter/aggregate-root/domain';

export default class TalentCrafterCreatedByMother {
	static create(value?: string): TalentCrafterCreatedBy {
		return new TalentCrafterCreatedBy(value ?? faker.internet.username());
	}

	static random(): TalentCrafterCreatedBy {
		return this.create();
	}
}
