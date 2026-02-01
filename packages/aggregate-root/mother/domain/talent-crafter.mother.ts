import type { PartialNullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';
import { TalentCrafterAggregateRoot } from '@talentcrafter/aggregate-root/domain';

import TalentCrafterCreatedAtMother from './talent-crafter-created-at.mother';
import TalentCrafterCreatedByMother from './talent-crafter-created-by.mother';
import TalentCrafterIdMother from './talent-crafter-id.mother';
import TalentCrafterUpdatedAtMother from './talent-crafter-updated-at.mother';
import TalentCrafterUpdatedByMother from './talent-crafter-updated-by.mother';

export default class TalentCrafterAggregateRootMother {
	static create({
		createdAt,
		createdBy,
		id,
		updatedAt,
		updatedBy,
	}: PartialNullable<Primitives<TalentCrafterAggregateRoot>> = {}): Primitives<TalentCrafterAggregateRoot> {
		return {
			createdAt: createdAt ?? TalentCrafterCreatedAtMother.random().value,
			createdBy: createdBy ?? TalentCrafterCreatedByMother.random().value,
			id: id ?? TalentCrafterIdMother.random().value,
			updatedAt: updatedAt ?? TalentCrafterUpdatedAtMother.random().value,
			updatedBy: updatedBy ?? TalentCrafterUpdatedByMother.random().value,
		};
	}

	static random(): Primitives<TalentCrafterAggregateRoot> {
		return this.create();
	}
}
