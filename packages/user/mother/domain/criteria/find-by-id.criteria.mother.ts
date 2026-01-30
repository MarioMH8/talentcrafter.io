import { TalentCrafterIdMother } from '@talentcrafter/aggregate-root/mother/domain';
import { FindUserByIdCriteria } from '@talentcrafter/user/domain';

export default class FindUserByIdCriteriaMother {
	static create(id?: string): FindUserByIdCriteria {
		return new FindUserByIdCriteria({
			id: id ?? TalentCrafterIdMother.random().value,
		});
	}

	static random(): FindUserByIdCriteria {
		return this.create();
	}
}
