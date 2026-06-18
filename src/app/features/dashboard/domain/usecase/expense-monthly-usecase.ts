import { inject, Service } from "@angular/core";

import { ExpenseMonthlyEntity } from "../entities";
import { ExpenseMonthlyRepository } from "../repositories";

@Service()
export class ExpenseMonthlyUsecase {

    private expenseMonthlyRepository = inject( ExpenseMonthlyRepository );

    execute(): Promise<ExpenseMonthlyEntity[]> {
        return this.expenseMonthlyRepository.getExpenses();
    }
}
