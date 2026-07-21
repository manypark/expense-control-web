import { inject, Service } from "@angular/core";

import { BillEntity } from "../entities";
import { BillsRepository } from "../repositories";

@Service()
export class GetBillsUsecase {

    private readonly billsRepository = inject( BillsRepository );

    execute(): Promise<BillEntity[]> {
        return this.billsRepository.getBills();
    }
}
