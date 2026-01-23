import { TalentCrafterId } from '@talentcrafter/aggregate-root/domain';

export default class TalentCrafterIdMother {
	static create(value?: string): TalentCrafterId {
		return new TalentCrafterId(value ?? TalentCrafterId.random());
	}

	static random(): TalentCrafterId {
		return this.create();
	}
}
