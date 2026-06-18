import { inject, Service } from "@angular/core";

import { ExpenseMonthlyDto } from "../dtos/responses/expense-monthly-dto";
import { HttpClientService } from "../../../../core/services/http/http-services-impl";

@Service()
export class ExpenseMonthlyDatasourceImpl {

    private httpClient = inject( HttpClientService );

    async getExpenses(): Promise<ExpenseMonthlyDto[]> {
        try {
            return await this.httpClient.get( '/expenses' );
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }
}
