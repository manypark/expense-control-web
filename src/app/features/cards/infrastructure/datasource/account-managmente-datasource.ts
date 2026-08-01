import { inject, Service } from "@angular/core";

import { HttpClientService } from "../../../../core/services/http/http-services-impl";
import { AccountCreatedEntity, CreateAccountEntity, UpdtaeAccountEntity } from "../../domain";

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

    async updateAccount( account : UpdtaeAccountEntity ) : Promise<AccountCreatedEntity> {
        try {
            const response = await this.httpClient.patch<AccountCreatedEntity>( `/accounts/${account.id}`,
                {
                    "name"      : account.name,
                    "balance"   : account.balance,
                    "code"      : account.code,
                }
            );
            return response;
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }
}