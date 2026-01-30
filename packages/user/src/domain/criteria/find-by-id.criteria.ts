import type { Primitives } from '@hexadrop/types/primitives';
import { TalentCrafterId } from '@talentcrafter/aggregate-root/domain';

export default class FindUserByIdCriteria {
	readonly id: TalentCrafterId;
	constructor({ id }: Primitives<FindUserByIdCriteria>) {
		this.id = new TalentCrafterId(id);
	}
}
