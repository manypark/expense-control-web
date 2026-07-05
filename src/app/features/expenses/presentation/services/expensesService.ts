import { inject, Service, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';

import { toast } from 'ngx-sonner';
import { injectMutation, injectQueryClient } from "@tanstack/angular-query-experimental";

import { CreateExpenseEntity, CreateExpenseUsecase } from '../../domain';

@Service()
export class ExpensesService {

    private readonly queryClient = injectQueryClient();
    private readonly createExpenseUsecase = inject( CreateExpenseUsecase );
    onExpenseCreated?: () => void;

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
                    const incurredAt = this.parseDateToIso(value.date);
                    const incurredDate = new Date(incurredAt);

                    this.createExpenseMutation.mutate({
                        title         : value.title,
                        description   : value.description,
                        category      : value.category,
                        amount        : Number(value.amount),
                        incurredAt,
                        statementYear : incurredDate.getUTCFullYear(),
                        statementMonth: incurredDate.getUTCMonth() + 1,
                        creditCardId  : value.cardId === 'cash' || !value.cardId ? null : value.cardId,
                    });

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
    }

    private parseDateToIso(date: string): string {
        const [day, month, year] = date.split('/').map(Number);
        return new Date(Date.UTC(year, month - 1, day)).toISOString();
    }
}
