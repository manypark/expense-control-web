import { CreateExpenseEntity, ExpenseEntity } from "../entities";

export abstract class ExpensesRepository {
    abstract createExpense(expense: CreateExpenseEntity): Promise<ExpenseEntity>;
}
