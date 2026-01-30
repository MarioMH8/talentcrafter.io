import { FindUserByUsernameCriteria } from '@talentcrafter/user/domain';
import UserUsernameOrEmailMother from '../user-username-or-email.mother';

export default class FindUserByUsernameCriteriaMother {
	static create(username?: string): FindUserByUsernameCriteria {
		return new FindUserByUsernameCriteria({
			username: username ?? UserUsernameOrEmailMother.random().value,
		});
	}

	static random(): FindUserByUsernameCriteria {
		return this.create();
	}
}
