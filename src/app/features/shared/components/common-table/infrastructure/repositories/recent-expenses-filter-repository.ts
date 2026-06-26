import { inject, Service } from "@angular/core";

import { RecentTransactionFilterDatasourceImpl } from "../datasource";
import { RecentExpensesFilterEntity, RecentTransactionFilterRepository } from "../../domain";

@Service()
export class RecentTransacionFilterRepositoryImpl implements RecentTransactionFilterRepository {

    private recentTransactionFilterDatasource = inject( RecentTransactionFilterDatasourceImpl );

    getRecentTransactionByFilter(limit: number, offset: number): Promise<RecentExpensesFilterEntity> {
        return this.recentTransactionFilterDatasource.getExpensesFilter( limit, offset );
    }
}