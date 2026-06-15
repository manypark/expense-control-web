import { inject, Service } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { AccountsUsecase } from '../../domain/usecase';

@Service()
export class AccountsServices {

    private readonly accountsUsecase = inject( AccountsUsecase );

    public accountsQuery = injectQuery(() => ({
        queryKey: ['get-accounts'],
        queryFn: () => this.accountsUsecase.execute(),
    }));

}
