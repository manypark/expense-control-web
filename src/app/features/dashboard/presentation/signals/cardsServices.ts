import { inject, Service } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { CardsUsecase } from '../../domain/usecase';

@Service()
export class CardsServices {

    private readonly cardsUsecase = inject( CardsUsecase );

    public accountsQuery = injectQuery( () => ({
        queryKey: ['get-cards'],
        queryFn: () => this.cardsUsecase.execute(),
    }));
}