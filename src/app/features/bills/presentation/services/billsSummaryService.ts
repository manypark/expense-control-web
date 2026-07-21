import { Service, computed, inject } from "@angular/core";

import { BillsQueryService } from "./billsQueryService";

@Service()
export class BillsSummaryService {

    private readonly billsQueryService = inject( BillsQueryService );

    readonly bills = computed(() => this.billsQueryService.billsQuery.data() ?? []);
    readonly pendingBills = computed(() => this.bills().filter((bill) => !bill.isPaid));
    readonly paidBills = computed(() => this.bills().filter((bill) => bill.isPaid));
    readonly totalBills = computed(() => this.bills().length);
    readonly currentMonthLabel = computed(() => {
        return new Intl.DateTimeFormat('es-MX', { month: 'long' }).format(new Date());
    });
}
