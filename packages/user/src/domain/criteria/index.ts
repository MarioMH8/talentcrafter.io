import FindUserByIdCriteria from './find-by-id.criteria';
import FindUserByEmailCriteria from './find-by-user-email.criteria';
import FindUserByUsernameCriteria from './find-by-username.criteria';
import type SearchUserByTermCriteria from './search-by-term.criteria';

type FindUserCriteria = FindUserByEmailCriteria | FindUserByIdCriteria | FindUserByUsernameCriteria;
type SearchUserCriteria = SearchUserByTermCriteria;

export type { FindUserCriteria, SearchUserCriteria };

export { default as FindUserByIdCriteria } from './find-by-id.criteria';
export { default as FindUserByEmailCriteria } from './find-by-user-email.criteria';
export { default as FindUserByUsernameCriteria } from './find-by-username.criteria';
export { default as SearchUserByTermCriteria } from './search-by-term.criteria';
