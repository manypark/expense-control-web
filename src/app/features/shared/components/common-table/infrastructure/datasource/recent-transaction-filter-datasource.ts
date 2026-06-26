import { inject, Service } from "@angular/core";

import { RecentExpensesFilterEntity } from "../../domain";
import { HttpClientService } from "../../../../../../core/services/http/http-services-impl";

@Service()
export class RecentTransactionFilterDatasourceImpl {

    private httpClient = inject( HttpClientService );

    async getExpensesFilter( limit:number, offset:number ): Promise<RecentExpensesFilterEntity> {
        try {
            const res:any = await this.httpClient.get( `/expenses?limit=${limit}&offset=${offset}` );
            return res;
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }
}