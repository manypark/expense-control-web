import { RecentTransactionEntity } from "../../../../entities/recent-transaction";

export interface RecentExpensesFilterEntity {
    items:   RecentTransactionEntity[];
    total:   number;
    limit:   number;
    offset:  number;
    hasMore: boolean;
}