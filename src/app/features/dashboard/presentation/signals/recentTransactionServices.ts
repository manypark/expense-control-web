import { inject, Service } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { RecentTransactionUsecase } from '../../domain/usecase';

@Service()
export class RecentTransactionsServices {

    private readonly recentTransactionUsecase = inject( RecentTransactionUsecase );

    public recentTransactionQuery = injectQuery(() => ({
        queryKey: ['get-recent-transaction'],
        queryFn: () => this.recentTransactionUsecase.execute(),
    }));

}
