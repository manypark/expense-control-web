import { inject, Service } from "@angular/core";

import { AccountsEntity } from "../entities/accounts-entity";
import { AccountsRepository } from "../repositories/accounts_repository";

@Service()
export class AccountsUsecase {

    private accountsRepository = inject( AccountsRepository );

    execute() : Promise<AccountsEntity[]> {
        return this.accountsRepository.getAccounts();
    }
}