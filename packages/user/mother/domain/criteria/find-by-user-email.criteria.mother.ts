import { FindUserByEmailCriteria } from '@talentcrafter/user/domain';

import UserUsernameOrEmailMother from '../user-username-or-email.mother';

export default class FindUserByEmailCriteriaMother {
	static create(email?: string): FindUserByEmailCriteria {
		return new FindUserByEmailCriteria({
			email: email ?? UserUsernameOrEmailMother.random().value,
		});
	}

	static random(): FindUserByEmailCriteria {
		return this.create();
	}
}
