import { inject, Service } from "@angular/core";

import { AccountManagmentDatasourceImpl } from "../datasource";
import { AccountCreatedEntity, CreateAccountEntity, CreateUpdateAccountRepository, UpdtaeAccountEntity } from "../../domain";

@Service()
export class CreateAccountRepositoryImpl implements CreateUpdateAccountRepository {
    
    private readonly createAccountDatasource = inject(AccountManagmentDatasourceImpl);

    updateAccount( account : UpdtaeAccountEntity ): Promise<AccountCreatedEntity> {
        return this.createAccountDatasource.updateAccount( account );
    }

    createAccount( account : CreateAccountEntity ) : Promise<AccountCreatedEntity> {
        return this.createAccountDatasource.createAccount( account );
    }

}