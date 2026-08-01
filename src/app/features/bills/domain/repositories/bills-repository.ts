import { BillEntity, CreateBillEntity, UpdateBillEntity } from "../entities";

export abstract class BillsRepository {
    abstract getBills(): Promise<BillEntity[]>;
    abstract createBill(bill: CreateBillEntity): Promise<BillEntity>;
    abstract updateBill(billId: string, bill: UpdateBillEntity): Promise<BillEntity>;
}