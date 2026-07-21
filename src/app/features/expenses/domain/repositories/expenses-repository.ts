import { CreateExpenseEntity, ExpenseEntity } from "../entities";

export abstract class ExpensesRepository {
    abstract createExpense(expense: CreateExpenseEntity): Promise<ExpenseEntity>;
    abstract updateExpense(expenseId: string, expense: Partial<CreateExpenseEntity>): Promise<ExpenseEntity>;
    abstract deleteExpense(expenseId: string): Promise<void>;
}
