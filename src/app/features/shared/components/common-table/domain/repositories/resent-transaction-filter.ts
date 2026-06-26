import { RecentExpensesFilterEntity } from "../entities/recent-expenses-filter";

export abstract class RecentTransactionFilterRepository {
    abstract getRecentTransactionByFilter( limit:number, offset:number ):Promise<RecentExpensesFilterEntity>;
}