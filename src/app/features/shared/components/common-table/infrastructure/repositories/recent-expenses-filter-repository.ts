import { inject, Service } from "@angular/core";

import { RecentTransactionFilterDatasourceImpl } from "../datasource";
import { RecentExpensesFilterEntity, RecentExpensesFilterParamsEntity, RecentTransactionFilterRepository } from "../../domain";

@Service()
export class RecentTransacionFilterRepositoryImpl implements RecentTransactionFilterRepository {

    private recentTransactionFilterDatasource = inject( RecentTransactionFilterDatasourceImpl );

    getRecentTransactionByFilter(params: RecentExpensesFilterParamsEntity): Promise<RecentExpensesFilterEntity> {
        return this.recentTransactionFilterDatasource.getExpensesFilter( params );
    }
}
