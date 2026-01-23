import DateValueObject from '@hexadrop/value-object/date';

export default class TalentCrafterUpdatedAt extends DateValueObject {
	constructor(value: Date) {
		super(value, 'TalentCrafterUpdatedAt');
	}
}
