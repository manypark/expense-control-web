import { inject, Service } from "@angular/core";

import { CreateUpdateAccountRepository } from "../repositories";
import { AccountCreatedEntity, UpdtaeAccountEntity } from "../entities";

@Service()
export class UpdateAccountUsecase {

    private readonly updateAccountRepository = inject( CreateUpdateAccountRepository );

    execute( account : UpdtaeAccountEntity ): Promise<AccountCreatedEntity> {
        return this.updateAccountRepository.updateAccount( account );
    }
}