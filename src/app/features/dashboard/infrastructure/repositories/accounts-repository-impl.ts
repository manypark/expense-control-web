import { inject, Service } from "@angular/core";

import { AccountsRepository } from "../../domain/repositories";
import { AccountsEntity } from "../../domain/entities/accounts-entity";
import { AccountsDatasourceImpl } from "../datasource/accounts-datasource-impl";

@Service()
export class AccountsRepositoryImpl implements AccountsRepository {
    
    private accountsDatasource = inject( AccountsDatasourceImpl );

    getAccounts(): Promise<AccountsEntity[]> {
        return this.accountsDatasource.getAccounts();
    }
}