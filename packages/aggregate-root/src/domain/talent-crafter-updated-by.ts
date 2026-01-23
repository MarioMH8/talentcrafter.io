import StringValueObject from '@hexadrop/value-object/string';

export default class TalentCrafterUpdatedBy extends StringValueObject {
	constructor(value: string) {
		super(value, undefined, 'TalentCrafterUpdatedBy');
	}
}
