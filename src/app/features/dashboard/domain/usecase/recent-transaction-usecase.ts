import { inject, Service } from "@angular/core";

import { RecentTransactionEntity } from "../entities";
import { RecentTransactionRepository } from "../repositories";

@Service()
export class RecentTransactionUsecase {

    private recentTransactionRepository = inject( RecentTransactionRepository );

    execute() : Promise<RecentTransactionEntity[]> {
        return this.recentTransactionRepository.getRecentTransaction();
    }
}