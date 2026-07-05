import { inject, Service } from "@angular/core";

import { CreateExpenseEntity, ExpenseEntity } from "../entities";
import { ExpensesRepository } from "../repositories";

@Service()
export class CreateExpenseUsecase {

    private expensesRepository = inject( ExpensesRepository );

    execute(expense: CreateExpenseEntity) : Promise<ExpenseEntity> {
        return this.expensesRepository.createExpense(expense);
    }
}
