import { inject, Service } from "@angular/core";

import { SignInRepository } from "../repositories";
import { SignInRequestEntity, SignInResponseEntity } from "../entities";

@Service()
export class SignInUsecase {

    private signInRepository = inject(SignInRepository);

    execute( signInEntity : SignInRequestEntity ) : Promise<SignInResponseEntity> {
        return this.signInRepository.signIn( signInEntity );
    }
}