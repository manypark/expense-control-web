import { AccountsEntity } from "../entities/accounts-entity";

export abstract class AccountsRepository {
    abstract getAccounts():Promise<AccountsEntity[]>;
}