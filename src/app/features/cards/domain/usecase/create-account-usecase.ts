import { inject, Service } from "@angular/core";

import { CreateUpdateAccountRepository } from "../repositories";
import { AccountCreatedEntity, CreateAccountEntity } from "../entities";

@Service()
export class CreateAccountUsecase {

    private readonly createAccountRepository = inject( CreateUpdateAccountRepository );

    execute( account : CreateAccountEntity ): Promise<AccountCreatedEntity > {
        return this.createAccountRepository.createAccount( account );
    }
}