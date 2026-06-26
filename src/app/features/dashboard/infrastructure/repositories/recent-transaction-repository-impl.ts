import { inject, Service } from "@angular/core";

import { RecentTransactionDatasourceImpl } from "../datasource";
import { RecentTransactionRepository } from "../../domain/repositories";
import { RecentTransactionEntity } from "../../../shared/entities/recent-transaction";

@Service()
export class RecentTransacionRepositoryImpl implements RecentTransactionRepository {

    private recentTransactionDatasource = inject( RecentTransactionDatasourceImpl );

    getRecentTransaction(): Promise<RecentTransactionEntity[]> {
        return this.recentTransactionDatasource.getExpenses();
    }
}