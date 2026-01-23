import AggregateRoot from '@hexadrop/aggregate-root';
import type { Nullable } from '@hexadrop/types/nullable';
import type { Primitives } from '@hexadrop/types/primitives';

import TalentCrafterCreatedAt from './talent-crafter-created-at';
import TalentCrafterCreatedBy from './talent-crafter-created-by';
import TalentCrafterDeletedAt from './talent-crafter-deleted-at';
import TalentCrafterDeletedBy from './talent-crafter-deleted-by';
import TalentCrafterId from './talent-crafter-id';
import TalentCrafterUpdatedAt from './talent-crafter-updated-at';
import TalentCrafterUpdatedBy from './talent-crafter-updated-by';

export default abstract class TalentCrafterAggregateRoot extends AggregateRoot {
	readonly createdAt: TalentCrafterCreatedAt;
	readonly createdBy: TalentCrafterCreatedBy;
	readonly deletedAt?: Nullable<TalentCrafterDeletedAt>;
	readonly deletedBy?: Nullable<TalentCrafterDeletedBy>;
	readonly id: TalentCrafterId;
	readonly updatedAt: TalentCrafterUpdatedAt;
	readonly updatedBy: TalentCrafterUpdatedBy;

	protected constructor(primitives: Primitives<TalentCrafterAggregateRoot>) {
		super();
		const { createdAt, createdBy, id, updatedAt, updatedBy } = primitives;
		this.id = new TalentCrafterId(id);
		this.createdAt = new TalentCrafterCreatedAt(createdAt);
		this.updatedAt = new TalentCrafterUpdatedAt(updatedAt);
		this.createdBy = new TalentCrafterCreatedBy(createdBy);
		this.updatedBy = new TalentCrafterUpdatedBy(updatedBy);
		this.deletedAt = primitives.deletedAt ? new TalentCrafterDeletedAt(primitives.deletedAt) : undefined;
		this.deletedBy = primitives.deletedBy ? new TalentCrafterDeletedBy(primitives.deletedBy) : undefined;
	}

	public toPrimitives(): Primitives<TalentCrafterAggregateRoot> {
		return {
			createdAt: this.createdAt.value,
			createdBy: this.createdBy.value,
			id: this.id.value,
			updatedAt: this.updatedAt.value,
			updatedBy: this.updatedBy.value,
		};
	}
}
