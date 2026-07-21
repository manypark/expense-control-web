import { Service, computed, inject, signal } from "@angular/core";

import { BillEntity } from "../../domain";
import { BillsActionsService } from "./billsActionsService";

@Service()
export class BillsModalService {

    private readonly billsActionsService = inject( BillsActionsService );

    readonly isOpen = signal(false);
    readonly editingBillId = signal<string | null>(null);
    readonly title = signal('');
    readonly dueDate = signal(this.formatDateToInput(new Date()));
    readonly dueDateInputValue = computed(() => this.formatDateToDateInput(this.dueDate()));
    readonly isPaid = signal(false);
    readonly isEditing = computed(() => this.editingBillId() !== null);
    readonly isSaving = computed(() => {
        return this.billsActionsService.createBillMutation.isPending() || this.billsActionsService.updateBillMutation.isPending();
    });

    openNewBillModal() {
        this.resetForm();
        this.isOpen.set(true);
    }

    openEditBillModal(bill: BillEntity) {
        this.editingBillId.set(bill.id);
        this.title.set(bill.title);
        this.dueDate.set(this.formatDateToInput(bill.dueDate));
        this.isPaid.set(bill.isPaid);
        this.isOpen.set(true);
    }

    closeModal() {
        this.isOpen.set(false);
    }

    setTitle(title: string) {
        this.title.set(title);
    }

    setDueDate(date: string) {
        this.dueDate.set(this.formatDateInputToDisplay(date));
    }

    setIsPaid(isPaid: boolean) {
        this.isPaid.set(isPaid);
    }

    saveBill() {
        const bill = {
            title  : this.title(),
            dueDate: this.dueDateInputValue(),
            isPaid : this.isPaid(),
        };

        const editingBillId = this.editingBillId();

        if (editingBillId) {
            this.billsActionsService.updateBill(editingBillId, bill, () => this.closeModal());
        } else {
            this.billsActionsService.createBill(bill, () => this.closeModal());
        }
    }

    private resetForm() {
        this.editingBillId.set(null);
        this.title.set('');
        this.dueDate.set(this.formatDateToInput(new Date()));
        this.isPaid.set(false);
    }

    private formatDateToInput(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    private formatDateInputToDisplay(date: string): string {
        const [year, month, day] = date.split('-');

        if (!day || !month || !year) { return date; }

        return `${day}/${month}/${year}`;
    }

    private formatDateToDateInput(date: string): string {
        const [day, month, year] = date.split('/');

        if (!day || !month || !year) { return ''; }

        return `${year}-${month}-${day}`;
    }
}
