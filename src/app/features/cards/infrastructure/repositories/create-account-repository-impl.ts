import { inject, Service } from "@angular/core";

import { AccountManagmentDatasourceImpl } from "../datasource";
import { AccountCreatedEntity, CreateAccountEntity, CreateAccountRepository } from "../../domain";

@Service()
export class CreateAccountRepositoryImpl implements CreateAccountRepository {

    private readonly createAccountDatasource = inject(AccountManagmentDatasourceImpl);

    createAccount( account : CreateAccountEntity ) : Promise<AccountCreatedEntity> {
        return this.createAccountDatasource.createAccount( account );
    }

}