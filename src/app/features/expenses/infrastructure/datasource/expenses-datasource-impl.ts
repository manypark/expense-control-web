import { inject, Service } from "@angular/core";

import { HttpClientService } from "../../../../core/services/http/http-services-impl";
import { CreateExpenseEntity, ExpenseEntity } from "../../domain";

@Service()
export class ExpensesDatasourceImpl {

    private httpClient = inject( HttpClientService );

    async createExpense(expense: CreateExpenseEntity) : Promise<ExpenseEntity> {
        try {
            return await this.httpClient.post( '/expenses', expense );
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }

    async updateExpense(expenseId: string, expense: Partial<CreateExpenseEntity>) : Promise<ExpenseEntity> {
        try {
            return await this.httpClient.patch( `/expenses/${expenseId}`, expense );
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }
}
