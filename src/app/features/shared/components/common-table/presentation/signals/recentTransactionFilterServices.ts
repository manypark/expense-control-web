import { computed, inject, Service, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { RecentTransactionFilterUsecase } from '../../domain/usecase';

@Service()
export class RecentTransactionsFilterServices {

    private readonly limit  = signal(10);
    private readonly offset = signal(0);
    readonly offsetComputed = computed( () => { return this.offset(); });
    private readonly recentTransactionFilterUsecase = inject( RecentTransactionFilterUsecase );

    public updateOffset( offset:number ) {
        this.offset.set( offset );
    }

    public recentTransactionFilterQuery = injectQuery(() => ({
        queryKey: ['get-recent-filter-transaction'],
        queryFn : () => this.recentTransactionFilterUsecase.execute( this.limit(), this.offsetComputed() ),
    }));

}