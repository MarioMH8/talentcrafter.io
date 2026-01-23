import { faker } from '@faker-js/faker';
import { TalentCrafterDeletedBy } from '@talentcrafter/aggregate-root/domain';

export default class TalentCrafterDeletedByMother {
	static create(value?: string): TalentCrafterDeletedBy {
		return new TalentCrafterDeletedBy(value ?? faker.internet.username());
	}

	static random(): TalentCrafterDeletedBy {
		return this.create();
	}
}
