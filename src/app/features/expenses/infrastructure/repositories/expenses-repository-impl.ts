import { inject, Service } from "@angular/core";

import { CreateExpenseEntity, ExpenseEntity, ExpensesRepository } from "../../domain";
import { ExpensesDatasourceImpl } from "../datasource";

@Service()
export class ExpensesRepositoryImpl implements ExpensesRepository {

    private expensesDatasource = inject( ExpensesDatasourceImpl );

    createExpense(expense: CreateExpenseEntity): Promise<ExpenseEntity> {
        return this.expensesDatasource.createExpense(expense);
    }

    updateExpense(expenseId: string, expense: Partial<CreateExpenseEntity>): Promise<ExpenseEntity> {
        return this.expensesDatasource.updateExpense(expenseId, expense);
    }

    deleteExpense(expenseId: string): Promise<void> {
        return this.expensesDatasource.deleteExpense(expenseId);
    }
}
