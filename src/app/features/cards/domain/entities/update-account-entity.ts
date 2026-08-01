import { AccountCreatedEntity } from "./account-created-entity";

export type UpdtaeAccountEntity = Pick<AccountCreatedEntity, 'name' | 'code' | 'balance' | 'id'>;