import StringValueObject from '@hexadrop/value-object/string';

export default class UserTerm extends StringValueObject {
	constructor(value: string) {
		super(value, undefined, 'UserTerm');
	}
}
