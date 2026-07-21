import { Service, inject } from "@angular/core";
import { injectMutation, injectQueryClient } from "@tanstack/angular-query-experimental";
import { toast } from "ngx-sonner";

import { BillEntity, CreateBillEntity, UpdateBillEntity } from "../../domain";
import { CreateBillUsecase, UpdateBillUsecase } from "../../domain";

@Service()
export class BillsActionsService {

    private readonly queryClient = injectQueryClient();
    private readonly createBillUsecase = inject( CreateBillUsecase );
    private readonly updateBillUsecase = inject( UpdateBillUsecase );

    readonly createBillMutation = injectMutation(() => ({
        mutationFn: (bill: CreateBillEntity) => this.createBillUsecase.execute(bill),
        onSuccess : () => {
            toast.success('Servicio guardado correctamente');
            this.refreshBills();
        },
        onError   : (error) => { toast.error(error.message); },
    }));

    readonly updateBillMutation = injectMutation(() => ({
        mutationFn: ({ billId, bill }: { billId: string; bill: UpdateBillEntity }) => {
            return this.updateBillUsecase.execute(billId, bill);
        },
        onSuccess : () => {
            toast.success('Servicio actualizado correctamente');
            this.refreshBills();
        },
        onError   : (error) => { toast.error(error.message); },
    }));

    createBill(bill: CreateBillEntity, onSuccess?: () => void) {
        this.createBillMutation.mutate(bill, { onSuccess });
    }

    updateBill(billId: string, bill: UpdateBillEntity, onSuccess?: () => void) {
        this.updateBillMutation.mutate({ billId, bill }, { onSuccess });
    }

    toggleBillPaid(bill: BillEntity, isPaid: boolean) {
        this.updateBill(bill.id, { isPaid });
    }

    private refreshBills() {
        this.queryClient.invalidateQueries({ queryKey: ['get-bills'] });
    }
}
