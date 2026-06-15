import { inject, Service } from "@angular/core";

import { AccountsDto } from "../dtos/responses/accounts_dto";
import { HttpClientService } from "../../../../core/services/http/http-services-impl";

@Service()
export class AccountsDatasourceImpl {

    private httpClient = inject( HttpClientService );

    async getAccounts() : Promise<AccountsDto[]> {
        try {
            return await this.httpClient.get( '/accounts' );
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }   
}