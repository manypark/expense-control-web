import { RecentExpensesFilterEntity, RecentExpensesFilterParamsEntity } from "../entities/recent-expenses-filter";

export abstract class RecentTransactionFilterRepository {
    abstract getRecentTransactionByFilter(params: RecentExpensesFilterParamsEntity): Promise<RecentExpensesFilterEntity>;
}
