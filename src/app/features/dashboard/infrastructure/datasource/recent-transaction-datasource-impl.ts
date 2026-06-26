import { inject, Service } from "@angular/core";

import { HttpClientService } from "../../../../core/services/http/http-services-impl";
import { RecentTransactionEntity } from "../../../shared/entities/recent-transaction";

@Service()
export class RecentTransactionDatasourceImpl {

    private httpClient = inject( HttpClientService );

    async getExpenses(): Promise<RecentTransactionEntity[]> {
        try {
            const res:any = await this.httpClient.get( '/expenses?limit=7' );
            return res['items'];
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }
}