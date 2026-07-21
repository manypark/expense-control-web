import { inject, Service } from "@angular/core";

import { BillEntity, BillsRepository, CreateBillEntity, UpdateBillEntity } from "../../domain";
import { BillsDatasourceImpl } from "../datasource";

@Service()
export class BillsRepositoryImpl implements BillsRepository {

    private readonly billsDatasource = inject( BillsDatasourceImpl );

    getBills(): Promise<BillEntity[]> {
        return this.billsDatasource.getBills();
    }

    createBill(bill: CreateBillEntity): Promise<BillEntity> {
        return this.billsDatasource.createBill(bill);
    }

    updateBill(billId: string, bill: UpdateBillEntity): Promise<BillEntity> {
        return this.billsDatasource.updateBill(billId, bill);
    }
}
