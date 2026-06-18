import { RecentTransactionEntity } from "../entities";

export abstract class RecentTransactionRepository {
    abstract getRecentTransaction():Promise<RecentTransactionEntity[]>;
}