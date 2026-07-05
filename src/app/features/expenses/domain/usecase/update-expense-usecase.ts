import { inject, Service } from "@angular/core";

import { CreateExpenseEntity, ExpenseEntity } from "../entities";
import { ExpensesRepository } from "../repositories";

@Service()
export class UpdateExpenseUsecase {

    private expensesRepository = inject( ExpensesRepository );

    execute(expenseId: string, expense: Partial<CreateExpenseEntity>) : Promise<ExpenseEntity> {
        return this.expensesRepository.updateExpense(expenseId, expense);
    }
}
