import UlidValueObject from '@hexadrop/value-object/ulid';

export default class TalentCrafterId extends UlidValueObject {
	constructor(value: string) {
		super(value, 'TalentCrafterId');
	}
}
