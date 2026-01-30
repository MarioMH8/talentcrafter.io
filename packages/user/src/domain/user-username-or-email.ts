import StringValueObject from '@hexadrop/value-object/string';

export default class UserUsernameOrEmail extends StringValueObject {
	constructor(value: string) {
		super(value, undefined, 'UserUsernameOrEmail');
	}
}
