import StringValueObject from '@hexadrop/value-object/string';

export default class TalentCrafterCreatedBy extends StringValueObject {
	constructor(value: string) {
		super(value, undefined, 'TalentCrafterCreatedBy');
	}
}
