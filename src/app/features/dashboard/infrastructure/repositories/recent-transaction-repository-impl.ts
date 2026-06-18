import { inject, Service } from "@angular/core";

import { RecentTransactionEntity } from "../../domain/entities";
import { RecentTransactionDatasourceImpl } from "../datasource";
import { RecentTransactionRepository } from "../../domain/repositories";

@Service()
export class RecentTransacionRepositoryImpl implements RecentTransactionRepository {

    private recentTransactionDatasource = inject( RecentTransactionDatasourceImpl );

    getRecentTransaction(): Promise<RecentTransactionEntity[]> {
        return this.recentTransactionDatasource.getExpenses();
    }
}