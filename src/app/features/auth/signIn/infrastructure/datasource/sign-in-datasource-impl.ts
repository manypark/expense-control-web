import { inject, Service } from "@angular/core";

import { SignInRequestEntity, SignInResponseEntity } from "../../domain";
import { HttpClientService } from "../../../../../core/services/http/http-services-impl";

@Service()
export class SignInDatasourceImpl {
    
    private httpClient = inject( HttpClientService );

    async signIn( { email, password } : SignInRequestEntity ) : Promise<SignInResponseEntity> {
        try {

            return await this.httpClient.post( '/auth/login', {
                email   : email.value,
                password: password.value
            });

        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }
}