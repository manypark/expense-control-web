import { Service, inject } from "@angular/core";
import { injectQuery } from "@tanstack/angular-query-experimental";

import { GetBillsUsecase } from "../../domain";

@Service()
export class BillsQueryService {

    private readonly getBillsUsecase = inject( GetBillsUsecase );

    readonly billsQuery = injectQuery(() => ({
        queryKey: ['get-bills'],
        queryFn : () => this.getBillsUsecase.execute(),
    }));
}
