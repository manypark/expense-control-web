import { inject, Service } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { ExpenseMonthlyUsecase } from '../../domain/usecase';

@Service()
export class ExpenseMonthlyServices {

    private readonly expenseMonthlyUsecase = inject( ExpenseMonthlyUsecase );

    public expensesQuery = injectQuery(() => ({
        queryKey: ['get-expenses-monthly'],
        queryFn: () => this.expenseMonthlyUsecase.execute(),
    }));
}
