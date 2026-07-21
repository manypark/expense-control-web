import { inject, Service } from "@angular/core";

import { BillEntity, UpdateBillEntity } from "../entities";
import { BillsRepository } from "../repositories";

@Service()
export class UpdateBillUsecase {

    private readonly billsRepository = inject( BillsRepository );

    execute(billId: string, bill: UpdateBillEntity): Promise<BillEntity> {
        return this.billsRepository.updateBill(billId, bill);
    }
}
