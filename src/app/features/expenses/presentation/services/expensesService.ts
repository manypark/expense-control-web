import { inject, Service, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';

import { toast } from 'ngx-sonner';
import { injectMutation, injectQueryClient } from "@tanstack/angular-query-experimental";

import { RecentTransactionEntity } from '../../../shared/entities';
import { CreateExpenseEntity, CreateExpenseUsecase, UpdateExpenseUsecase } from '../../domain';

type ExpenseFormModel = {
    title:       string;
    description: string;
    category:    string;
    amount:      string;
    date:        string;
    cardId:      string;
}

@Service()
export class ExpensesService {

    private readonly queryClient = injectQueryClient();
    private readonly createExpenseUsecase = inject( CreateExpenseUsecase );
    private readonly updateExpenseUsecase = inject( UpdateExpenseUsecase );
    onExpenseCreated?: () => void;
    private editingExpenseId = signal<string | null>(null);
    private originalExpensePayload = signal<Partial<CreateExpenseEntity> | null>(null);

    // ************* || form modelo || *************
    expenseModel = signal({
        title       : '',
        description : '',
        category    : '',
        amount      : '',
        date        : '',
        cardId      : '',
    });

    // ************* || mutacion || *************
    readonly createExpenseMutation = injectMutation( () => ({
        mutationFn: (expense: CreateExpenseEntity) => this.createExpenseUsecase.execute(expense),
        onSuccess : () => {
            toast.success('Gasto guardado correctamente');
            this.resetForm();
            this.onExpenseCreated?.();
            this.queryClient.invalidateQueries({ queryKey: ['get-recent-filter-transaction'] });
        },
        onError   : (error) => { toast.error( error.message ); },
    }));

    readonly updateExpenseMutation = injectMutation( () => ({
        mutationFn: ({ expenseId, expense }: { expenseId: string; expense: Partial<CreateExpenseEntity> }) => {
            return this.updateExpenseUsecase.execute(expenseId, expense);
        },
        onSuccess : () => {
            toast.success('Gasto actualizado correctamente');
            this.resetForm();
            this.onExpenseCreated?.();
            this.queryClient.invalidateQueries({ queryKey: ['get-recent-filter-transaction'] });
        },
        onError   : (error) => { toast.error( error.message ); },
    }));

    // ************* || validacion y submit de formulario || *************
    expenseForm = form(
        this.expenseModel,
        ( schema ) => {
            required( schema.title, { message: 'El titulo es requerido.' } );
            required( schema.category, { message: 'La categoría es requerida.' } );
            required( schema.amount, { message: 'El monto es requerido.' } );
            required( schema.date, { message: 'La fecha es requerida.' } );
        },
        {
            submission: {
                action : async (field) => {
                    const value = field().value();
                    const payload = this.buildExpensePayload(value);
                    const expenseId = this.editingExpenseId();

                    if (expenseId) {
                        const changedPayload = this.getChangedPayload(payload);

                        if (Object.keys(changedPayload).length === 0) {
                            toast.info('No hay cambios para guardar');
                            return null;
                        }

                        this.updateExpenseMutation.mutate({
                            expenseId,
                            expense: changedPayload,
                        });

                        return null;
                    }

                    this.createExpenseMutation.mutate(payload);

                    return null;
                },
            }
        }
    );

    setCategory(category: string) {
        this.expenseModel.update((value) => ({ ...value, category }));
    }

    setDate(date: string) {
        this.expenseModel.update((value) => ({ ...value, date }));
    }

    setCard(cardId: string) {
        this.expenseModel.update((value) => ({ ...value, cardId }));
    }

    setExpenseToEdit(expense: RecentTransactionEntity) {
        const formValue: ExpenseFormModel = {
            title      : expense.title,
            description: expense.description,
            category   : expense.category,
            amount     : String(expense.amount),
            date       : this.formatDateToInput(expense.incurredAt),
            cardId     : expense.creditCardId ?? expense.creditCard?.id ?? 'cash',
        };

        this.editingExpenseId.set(expense.id);
        this.expenseModel.set(formValue);
        this.originalExpensePayload.set(this.buildExpensePayload(formValue));
    }

    resetForm() {
        this.expenseForm().reset();
        this.expenseModel.set({
            title       : '',
            description : '',
            category    : '',
            amount      : '',
            date        : '',
            cardId      : '',
        });
        this.editingExpenseId.set(null);
        this.originalExpensePayload.set(null);
    }

    isEditing() {
        return this.editingExpenseId() !== null;
    }

    private buildExpensePayload(value: ExpenseFormModel): CreateExpenseEntity {
        const incurredAt = this.parseDateToIso(value.date);
        const incurredDate = new Date(incurredAt);

        return {
            title         : value.title,
            description   : value.description,
            category      : value.category,
            amount        : Number(value.amount),
            incurredAt,
            statementYear : incurredDate.getUTCFullYear(),
            statementMonth: incurredDate.getUTCMonth() + 1,
            creditCardId  : value.cardId === 'cash' || !value.cardId ? null : value.cardId,
        };
    }

    private getChangedPayload(currentPayload: CreateExpenseEntity): Partial<CreateExpenseEntity> {
        const originalPayload = this.originalExpensePayload();
        const changedPayload: Partial<CreateExpenseEntity> = {};

        if (!originalPayload) { return currentPayload; }

        const keys = Object.keys(currentPayload) as (keyof CreateExpenseEntity)[];

        for (const key of keys) {
            if (currentPayload[key] !== originalPayload[key]) {
                changedPayload[key] = currentPayload[key] as never;
            }
        }

        return changedPayload;
    }

    private parseDateToIso(date: string): string {
        const [day, month, year] = date.split('/').map(Number);
        return new Date(Date.UTC(year, month - 1, day)).toISOString();
    }

    private formatDateToInput(date: Date | string): string {
        const parsedDate = new Date(date);
        const day = String(parsedDate.getUTCDate()).padStart(2, '0');
        const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
        const year = parsedDate.getUTCFullYear();

        return `${day}/${month}/${year}`;
    }
}
