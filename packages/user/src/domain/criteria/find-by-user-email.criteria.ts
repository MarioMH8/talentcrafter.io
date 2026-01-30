import type { Primitives } from '@hexadrop/types/primitives';

import UserUsernameOrEmail from '../user-username-or-email';

export default class FindUserByEmailCriteria {
	readonly email: UserUsernameOrEmail;
	constructor(primitives: Primitives<FindUserByEmailCriteria>) {
		const { email } = primitives;
		this.email = new UserUsernameOrEmail(email);
	}
}
