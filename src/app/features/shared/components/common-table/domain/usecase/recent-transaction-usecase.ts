import { inject, Service } from "@angular/core";

import { RecentTransactionFilterRepository } from "../repositories";
import { RecentExpensesFilterEntity } from "../entities/recent-expenses-filter";

@Service()
export class RecentTransactionFilterUsecase {

    private recentTransactionRepository = inject( RecentTransactionFilterRepository );

    execute( limit:number, offset:number ) : Promise<RecentExpensesFilterEntity> {
        return this.recentTransactionRepository.getRecentTransactionByFilter( limit, offset );
    }
}