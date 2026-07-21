import { inject, Service } from "@angular/core";

import { ExpensesRepository } from "../repositories";

@Service()
export class DeleteExpenseUsecase {

    private expensesRepository = inject( ExpensesRepository );

    execute(expenseId: string) : Promise<void> {
        return this.expensesRepository.deleteExpense(expenseId);
    }
}
