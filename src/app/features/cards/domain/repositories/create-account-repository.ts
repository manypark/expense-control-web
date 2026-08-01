import { CreateAccountEntity, AccountCreatedEntity } from "../entities";

export abstract class CreateAccountRepository {
    abstract createAccount( account : CreateAccountEntity ): Promise<AccountCreatedEntity>;
}