import { AfterViewInit, Component, NgZone, computed, inject, signal } from '@angular/core';
import { FormRoot } from '@angular/forms/signals';
import { DecimalPipe } from '@angular/common';

import { Datepicker, Drawer, Modal } from 'flowbite';
import { DateRangePicker } from 'flowbite-datepicker';

import { ExpensesService } from '../../services/expensesService';
import { ExpensesFilterService } from '../../services/expensesFilterService';
import { RecentTransactionEntity } from '../../../../shared/entities';
import { CardsServices } from '../../../../dashboard/presentation/signals';
import { RecentTransactionsFilterServices } from '../../../../shared/components/common-table/presentation/signals';
import { CommonButton, CommonInput, CommonSelect } from "../../../../shared/components/inputs";
import { CommonTable } from "../../../../shared/components/common-table/presentation/pages/common-table";

@Component({
  selector    : 'app-expenses',
  templateUrl : './expenses.html',
  styleUrl    : './expenses.css',
  imports     : [DecimalPipe, FormRoot, CommonButton, CommonTable, CommonInput, CommonSelect],
})

export default class Expenses implements AfterViewInit {

  private readonly ngZone = inject( NgZone );
  readonly cardsServices = inject( CardsServices );
  readonly expensesService = inject( ExpensesService );
  readonly expensesFilterService = inject( ExpensesFilterService );
  readonly recentTransactionsFilterServices = inject( RecentTransactionsFilterServices );

  private drawer?: Drawer;
  private deleteExpenseModal?: Modal;
  private picker?: DateRangePicker;
  private pickerExpense?: Datepicker;
  isExpenseDrawerOpen = signal(false);
  expenseToDelete = signal<RecentTransactionEntity | null>(null);

   constructor() {
    this.expensesService.onExpenseCreated = () => this.closeSidebar(false);
   }

   cardOptions = computed(() => [
    {
      label: 'Contado',
      value: 'cash'
    },
    ...(this.cardsServices.accountsQuery.data() ?? []).map((card) => ({
      label: `${card.alias} - ${card.bank} ****${card.last4}`,
      value: card.id,
    }))
   ]);

   categories = [
    {
      label: 'Alimentos',
      value: 'Alimentos'
    },
    {
      label: 'Salud',
      value: 'Salud'
    },
    {
      label: 'Compras',
      value: 'Compras'
    },
    {
      label: 'Entretenimiento',
      value: 'Entretenimiento'
    },
    {
      label: 'Servicios',
      value: 'Servicios'
    },
    {
      label: 'Educación',
      value: 'Educación'
    },
    {
      label: 'Transporte',
      value: 'Transporte'
    },
    {
      label: 'Viajes',
      value: 'Viajes'
    },
    {
      label: 'Otros',
      value: 'Otros'
    }
  ];

  ngAfterViewInit(): void {
    const element = document.getElementById('date-range-picker');
    const startInput = document.getElementById('datepicker-range-start') as HTMLInputElement | null;
    const endInput = document.getElementById('datepicker-range-end') as HTMLInputElement | null;

    if (!element || !startInput || !endInput) { return; }

    startInput.value = this.expensesFilterService.startDate();
    endInput.value = this.expensesFilterService.endDate();

    this.picker = new DateRangePicker(element, {
      autohide: true,
      format: 'dd/mm/yyyy',
      todayHighlight: true,
    });

    this.listenDateRangeInput(startInput, (date) => this.expensesFilterService.setStartDate(date));
    this.listenDateRangeInput(endInput, (date) => this.expensesFilterService.setEndDate(date));
  }

  showSidebar() {
    this.expensesService.resetForm();
    this.expensesService.setTodayDate();
    this.openExpenseDrawer();
  }

  onEditExpense(expense: RecentTransactionEntity) {
    this.expensesService.setExpenseToEdit(expense);
    this.openExpenseDrawer();
  }

  onDeleteExpense(expense: RecentTransactionEntity) {
    this.expenseToDelete.set(expense);

    setTimeout(() => {
      this.initializeDeleteExpenseModal();
      this.deleteExpenseModal?.show();
    });
  }

  closeDeleteExpenseModal() {
    this.deleteExpenseModal?.hide();
    this.deleteExpenseModal = undefined;
    this.expenseToDelete.set(null);
  }

  confirmDeleteExpense() {
    const expense = this.expenseToDelete();

    if (!expense) { return; }

    this.expensesService.deleteExpense(expense.id);
    this.closeDeleteExpenseModal();
  }

  private openExpenseDrawer() {
    this.isExpenseDrawerOpen.set(true);

    setTimeout(() => {
      this.initializeExpenseDrawer();
      this.drawer?.show();
    });
  }

  closeSidebar(resetForm = true) {
    this.drawer?.hide();
    this.drawer = undefined;
    this.pickerExpense = undefined;
    this.isExpenseDrawerOpen.set(false);

    if (resetForm) {
      this.expensesService.resetForm();
    }
  }

  private initializeExpenseDrawer() {
    const target = document.getElementById('drawer-navigation');
    const elementDatePicker = document.getElementById('default-datepicker');

    if (!target || !elementDatePicker) { return; }

    this.drawer = new Drawer(target);

    const datepickerOptions = {
      autohide: true,
      format: 'dd/mm/yyyy',
      todayBtn: true,
      todayBtnMode: 1,
      todayHighlight: true,
    };

    this.pickerExpense = new Datepicker(elementDatePicker, datepickerOptions);
    this.pickerExpense.setDate(this.expensesService.expenseForm.date().value());

    document.querySelectorAll<HTMLButtonElement>('.today-btn').forEach((button) => {
      button.textContent = 'Hoy';
    });

    elementDatePicker.addEventListener('changeDate', () => {
      this.ngZone.run(() => {
        this.expensesService.setDate((elementDatePicker as HTMLInputElement).value);
      });
    });
  }

  private initializeDeleteExpenseModal() {
    const target = document.getElementById('delete-expense-modal');

    if (!target) { return; }

    this.deleteExpenseModal = new Modal(target, {
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900/50 fixed inset-0 z-[75]',
      closable: true,
    });
  }

  onCategoryChange( emit:any ) {
    console.log(emit);
  }

  onCategoryChangeInput( category:string ) {
    this.expensesService.setCategory(category);
  }

  onCardChange( cardId:string ) {
    this.expensesService.setCard(cardId);
  }

  onDateChange( event: Event ) {
    const date = (event.target as HTMLInputElement).value;
    this.expensesService.setDate(date);
  }

  private listenDateRangeInput(input: HTMLInputElement, setDate: (date: string) => void) {
    const updateDate = () => {
      this.ngZone.run(() => setDate(input.value));
    };

    input.addEventListener('input', updateDate);
    input.addEventListener('change', updateDate);
    input.addEventListener('changeDate', updateDate);
  }
}
