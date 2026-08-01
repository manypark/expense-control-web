import { inject, Service } from "@angular/core";

import { CreateAccountRepository } from "../repositories";
import { AccountCreatedEntity, CreateAccountEntity } from "../entities";

@Service()
export class CreateAccountUsecase {

    private readonly createAccountRepository = inject( CreateAccountRepository );

    execute( account : CreateAccountEntity ): Promise<AccountCreatedEntity > {
        return this.createAccountRepository.createAccount( account );
    }
}