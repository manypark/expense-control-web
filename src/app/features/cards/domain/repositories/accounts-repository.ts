import { CreateAccountEntity, AccountCreatedEntity, UpdtaeAccountEntity } from "../entities";

export abstract class CreateUpdateAccountRepository {
    abstract createAccount( account : CreateAccountEntity ): Promise<AccountCreatedEntity>;
    abstract updateAccount( account : UpdtaeAccountEntity ): Promise<AccountCreatedEntity>;
}