import { RecentTransactionEntity } from "../../../shared/entities/recent-transaction";

export abstract class RecentTransactionRepository {
    abstract getRecentTransaction():Promise<RecentTransactionEntity[]>;
}