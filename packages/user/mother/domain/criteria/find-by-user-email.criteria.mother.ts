import { FindUserByEmailCriteria } from '@talentcrafter/user/domain';

import UserTermMother from '../user-term.mother';

export default class FindUserByEmailCriteriaMother {
	static create(email?: string): FindUserByEmailCriteria {
		return new FindUserByEmailCriteria({
			email: email ?? UserTermMother.random().value,
		});
	}

	static random(): FindUserByEmailCriteria {
		return this.create();
	}
}
