import DateValueObject from '@hexadrop/value-object/date';

export default class TalentCrafterDeletedAt extends DateValueObject {
	constructor(value: Date) {
		super(value, 'TalentCrafterDeletedAt');
	}
}
