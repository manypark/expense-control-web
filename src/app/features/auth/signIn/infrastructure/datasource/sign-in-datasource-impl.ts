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
            console.error('SignInDatasource Error', error);
            throw new Error( error?.message ?? 'Unexpected error' );
        }
    }
}