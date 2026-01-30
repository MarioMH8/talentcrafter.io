import type { Primitives } from '@hexadrop/types/primitives';

import UserUsernameOrEmail from '../user-username-or-email';

export default class FindUserByUsernameCriteria {
	readonly username: UserUsernameOrEmail;
	constructor(primitives: Primitives<FindUserByUsernameCriteria>) {
		const { username } = primitives;
		this.username = new UserUsernameOrEmail(username);
	}
}
