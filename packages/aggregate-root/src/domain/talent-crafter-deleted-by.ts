import StringValueObject from '@hexadrop/value-object/string';

export default class TalentCrafterDeletedBy extends StringValueObject {
	constructor(value: string) {
		super(value, undefined, 'TalentCrafterDeletedBy');
	}
}
