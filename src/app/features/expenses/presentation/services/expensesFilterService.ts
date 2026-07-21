import { Service, inject, signal } from "@angular/core";

import { RecentTransactionsFilterServices } from "../../../shared/components/common-table/presentation/signals";

@Service()
export class ExpensesFilterService {

    private readonly recentTransactionsFilterServices = inject( RecentTransactionsFilterServices );

    readonly startDate = signal('');
    readonly endDate = signal('');

    setStartDate(date: string) {
        this.startDate.set(date);
    }

    setEndDate(date: string) {
        this.endDate.set(date);
    }

    applyDateFilter() {
        this.recentTransactionsFilterServices.applyDateFilter(
            this.formatDateToApi(this.startDate()),
            this.formatDateToApi(this.endDate()),
        );
    }

    private formatDateToApi(date: string): string | null {
        const [day, month, year] = date.split('/').map(Number);

        if (!day || !month || !year) { return null; }

        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

}
