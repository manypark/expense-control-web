import { inject, Service } from "@angular/core";

import { ExpenseMonthlyEntity } from "../../domain/entities";
import { ExpenseMonthlyDatasourceImpl } from "../datasource";
import { ExpenseMonthlyRepository } from "../../domain/repositories";

@Service()
export class ExpenseMonthlyRepositoryImpl implements ExpenseMonthlyRepository {

    private expenseMonthlyDatasource = inject( ExpenseMonthlyDatasourceImpl );

    getExpenses(): Promise<ExpenseMonthlyEntity[]> {
        return this.expenseMonthlyDatasource.getExpenses();
    }
}
