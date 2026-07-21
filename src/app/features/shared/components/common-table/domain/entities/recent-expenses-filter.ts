import { RecentTransactionEntity } from "../../../../entities/recent-transaction";

export interface RecentExpensesFilterEntity {
    items:   RecentTransactionEntity[];
    total:   number;
    limit:   number;
    offset:  number;
    hasMore: boolean;
    totalAmount?: number;
}

export interface RecentExpensesFilterParamsEntity {
    limit:    number;
    offset:   number;
    from?:    string | null;
    to?:      string | null;
    category?: string | null;
}
