import { inject, Service } from "@angular/core";

import { RecentExpensesFilterEntity, RecentExpensesFilterParamsEntity } from "../../domain";
import { HttpClientService } from "../../../../../../core/services/http/http-services-impl";
import { toRecentExpensesFilterRequestDto } from "../dtos/recent-expenses-filter-request-dto";

@Service()
export class RecentTransactionFilterDatasourceImpl {

    private httpClient = inject( HttpClientService );

    async getExpensesFilter(params: RecentExpensesFilterParamsEntity): Promise<RecentExpensesFilterEntity> {
        try {
            const request = toRecentExpensesFilterRequestDto(params);
            const queryParams = new URLSearchParams({
                limit: String(request.limit),
                offset: String(request.offset),
            });

            if (request.from) {
                queryParams.set('from', request.from);
            }

            if (request.to) {
                queryParams.set('to', request.to);
            }

            const res:any = await this.httpClient.get( `/expenses?${queryParams.toString()}` );
            return res;
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }
}
