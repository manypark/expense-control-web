import { inject, Service } from "@angular/core";

import { RecentTransactionFilterRepository } from "../repositories";
import { RecentExpensesFilterEntity, RecentExpensesFilterParamsEntity } from "../entities/recent-expenses-filter";

@Service()
export class RecentTransactionFilterUsecase {

    private recentTransactionRepository = inject( RecentTransactionFilterRepository );

    execute(params: RecentExpensesFilterParamsEntity) : Promise<RecentExpensesFilterEntity> {
        return this.recentTransactionRepository.getRecentTransactionByFilter( params );
    }
}
