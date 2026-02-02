import type { Primitives } from '@hexadrop/types/primitives';

import UserTerm from '../user-term';

export default class FindUserByEmailCriteria {
	readonly email: UserTerm;
	constructor(primitives: Primitives<FindUserByEmailCriteria>) {
		const { email } = primitives;
		this.email = new UserTerm(email);
	}
}
