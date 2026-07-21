import { inject, Service } from "@angular/core";

import { BillEntity, CreateBillEntity } from "../entities";
import { BillsRepository } from "../repositories";

@Service()
export class CreateBillUsecase {

    private readonly billsRepository = inject( BillsRepository );

    execute(bill: CreateBillEntity): Promise<BillEntity> {
        return this.billsRepository.createBill(bill);
    }
}
