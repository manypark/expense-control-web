import { ExpenseMonthlyEntity } from "../entities";

export abstract class ExpenseMonthlyRepository {
    abstract getExpenses(): Promise<ExpenseMonthlyEntity[]>;
}
