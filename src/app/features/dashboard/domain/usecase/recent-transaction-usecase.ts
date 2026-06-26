import { inject, Service } from "@angular/core";

import { RecentTransactionRepository } from "../repositories";
import { RecentTransactionEntity } from "../../../shared/entities/recent-transaction";

@Service()
export class RecentTransactionUsecase {

    private recentTransactionRepository = inject( RecentTransactionRepository );

    execute() : Promise<RecentTransactionEntity[]> {
        return this.recentTransactionRepository.getRecentTransaction();
    }
}