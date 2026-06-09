import { inject, Service } from "@angular/core";

import { SignInDatasourceImpl } from "../datasource/sign-in-datasource-impl";
import { SignInRepository, SignInRequestEntity, SignInResponseEntity } from "../../domain";

@Service()
export class SignInRepositoryImpl implements SignInRepository {

    private signInDataSource = inject( SignInDatasourceImpl );

    signIn( credentials : SignInRequestEntity ): Promise<SignInResponseEntity> {
        return this.signInDataSource.signIn( credentials );
    }
}