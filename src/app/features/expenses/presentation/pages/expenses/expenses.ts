import { AfterViewInit, Component, NgZone, computed, inject } from '@angular/core';
import { FormRoot } from '@angular/forms/signals';

import { Datepicker, Drawer } from 'flowbite';
import { DateRangePicker } from 'flowbite-datepicker';

import { CommonButton, CommonInput, CommonSelect } from "../../../../shared/components/inputs";
import { CommonTable } from "../../../../shared/components/common-table/presentation/pages/common-table";
import { CardsServices } from '../../../../dashboard/presentation/signals';
import { ExpensesService } from '../../services/expensesService';

@Component({
  selector    : 'app-expenses',
  templateUrl : './expenses.html',
  styleUrl    : './expenses.css',
  imports: [FormRoot, CommonButton, CommonTable, CommonInput, CommonSelect],
})

export default class Expenses implements AfterViewInit {

   readonly expensesService = inject( ExpensesService );
   readonly cardsServices = inject( CardsServices );
   private readonly ngZone = inject( NgZone );

   private picker?: DateRangePicker;
   private pickerExpense?: Datepicker;
   private drawer!: Drawer;

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

    const target = document.getElementById('drawer-navigation');
    this.drawer = new Drawer(target!);

    const element = document.getElementById('date-range-picker');
    const elementDatePicker = document.getElementById('default-datepicker');

    if (!element) { return; }
    if (!elementDatePicker) { return; }

    this.picker = new DateRangePicker(element, {
      autohide: true,
      format: 'dd/mm/yyyy'
    });
    
    this.pickerExpense = new Datepicker(elementDatePicker, {
      autohide: true,
      format: 'dd/mm/yyyy'
    });

    elementDatePicker.addEventListener('changeDate', () => {
      this.ngZone.run(() => {
        this.expensesService.setDate((elementDatePicker as HTMLInputElement).value);
      });
    });

  }

  showSidebar() {
    this.drawer.toggle();
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

}
