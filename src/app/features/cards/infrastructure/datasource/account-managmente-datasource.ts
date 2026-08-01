import { inject, Service } from "@angular/core";

import { AccountCreatedEntity, CreateAccountEntity } from "../../domain";
import { HttpClientService } from "../../../../core/services/http/http-services-impl";

@Service()
export class AccountManagmentDatasourceImpl {
    private readonly httpClient = inject( HttpClientService );

    async createAccount( account : CreateAccountEntity ) : Promise<AccountCreatedEntity> {
        try {
            const response = await this.httpClient.post<AccountCreatedEntity>( '/accounts', account );
            return response;
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }
}