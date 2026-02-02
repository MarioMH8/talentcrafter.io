import Either from '@hexadrop/either';
import type { Primitives } from '@hexadrop/types/primitives';
import type { DataSource, Repository } from 'typeorm';
import { EntitySchema, Like } from 'typeorm';

import type {
	UserRepository,
	UserRepositoryDeleteParameters,
	UserRepositoryDeleteReturn,
	UserRepositoryFindByEmailParameters,
	UserRepositoryFindByIdParameters,
	UserRepositoryFindParameters,
	UserRepositoryFindReturn,
	UserRepositorySearchParameters,
	UserRepositorySearchReturn,
	UserRepositoryUpsertParameters,
	UserRepositoryUpsertReturn,
} from '../../domain';
import { FindUserByIdCriteria, User } from '../../domain';
import TypeORMUserError from './typeorm-user.repository.error';

const UserSchema = new EntitySchema<Primitives<User>>({
	columns: {
		createdAt: {
			createDate: true,
			nullable: false,
			type: Date,
		},
		createdBy: {
			nullable: false,
			type: String,
		},
		deletedAt: {
			deleteDate: true,
			nullable: true,
			type: Date,
		},
		deletedBy: {
			nullable: false,
			type: String,
		},
		email: {
			length: 200,
			nullable: false,
			type: String,
		},
		id: {
			primary: true,
			type: String,
		},
		password: {
			length: 200,
			nullable: true,
			type: String,
		},
		updatedAt: {
			nullable: false,
			type: Date,
			updateDate: true,
		},
		updatedBy: {
			nullable: false,
			type: String,
		},
	},
	indices: [
		{
			columns: ['email'],
			name: 'idx_user_email',
			unique: true,
		},
	],
	name: 'User',
});

class TypeORMUserRepository implements UserRepository {
	private readonly repository: Repository<Primitives<User>>;

	constructor(ds: DataSource) {
		this.repository = ds.getRepository(UserSchema);
	}

	async delete(...users: UserRepositoryDeleteParameters): Promise<UserRepositoryDeleteReturn> {
		return this.upsert(...users);
	}

	async find(...[criteria]: UserRepositoryFindParameters): Promise<UserRepositoryFindReturn> {
		try {
			if (criteria instanceof FindUserByIdCriteria) {
				return await this.findById(criteria);
			}

			return await this.findByEmail(criteria);
		} catch (error: unknown) {
			return Either.left(new TypeORMUserError(error as Error));
		}
	}

	async search(...[criteria]: UserRepositorySearchParameters): Promise<UserRepositorySearchReturn> {
		try {
			const find = criteria.term
				? {
						skip: criteria.skip,
						take: criteria.take,
						where: [
							{
								email: criteria.term.includes('%') ? Like(criteria.term) : Like(`%${criteria.term}%`),
							},
						],
					}
				: {
						skip: criteria.skip,
						take: criteria.take,
					};

			const [data, total] = await this.repository.findAndCount(find);

			return Either.right([data.map(primitives => new User(primitives)), total]);
		} catch (error: unknown) {
			return Either.left(new TypeORMUserError(error as Error));
		}
	}

	async upsert(...users: UserRepositoryUpsertParameters): Promise<UserRepositoryUpsertReturn> {
		try {
			await this.repository.save(users.map(user => user.toNullPrimitives()));

			return Either.right();
		} catch (error: unknown) {
			return Either.left(new TypeORMUserError(error as Error));
		}
	}

	private async findByEmail(...[{ email }]: UserRepositoryFindByEmailParameters): Promise<UserRepositoryFindReturn> {
		try {
			const primitives = await this.repository.findOneBy({
				email: email.value,
			});

			return Either.right(primitives ? new User(primitives) : undefined);
		} catch (error: unknown) {
			return Either.left(new TypeORMUserError(error as Error));
		}
	}

	private async findById(...[{ id }]: UserRepositoryFindByIdParameters): Promise<UserRepositoryFindReturn> {
		try {
			const primitives = await this.repository.findOneBy({
				id: id.value,
			});

			return Either.right(primitives ? new User(primitives) : undefined);
		} catch (error: unknown) {
			return Either.left(new TypeORMUserError(error as Error));
		}
	}
}

export { UserSchema };
export default TypeORMUserRepository;
