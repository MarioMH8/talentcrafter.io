import DateValueObject from '@hexadrop/value-object/date';

export default class TalentCrafterCreatedAt extends DateValueObject {
	constructor(value: Date) {
		super(value, 'TalentCrafterCreatedAt');
	}
}
