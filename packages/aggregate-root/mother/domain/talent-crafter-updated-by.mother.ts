import { faker } from '@faker-js/faker';
import { TalentCrafterUpdatedBy } from '@talentcrafter/aggregate-root/domain';

export default class TalentCrafterUpdatedByMother {
	static create(value?: string): TalentCrafterUpdatedBy {
		return new TalentCrafterUpdatedBy(value ?? faker.internet.username());
	}

	static random(): TalentCrafterUpdatedBy {
		return this.create();
	}
}
