import { AfterViewInit, Component, signal } from '@angular/core';

import { Datepicker, Drawer } from 'flowbite';
import { DateRangePicker } from 'flowbite-datepicker';

import { CommonButton, CommonInput, CommonSelect } from "../../../../shared/components/inputs";
import { CommonTable } from "../../../../shared/components/common-table/presentation/pages/common-table";
import { email, form, minLength, pattern, required } from '@angular/forms/signals';
import { EmailVO, PasswordVO } from '../../../../auth/signIn/domain';

@Component({
  selector    : 'app-expenses',
  templateUrl : './expenses.html',
  styleUrl    : './expenses.css',
  imports: [CommonButton, CommonTable, CommonInput, CommonSelect],
})

export default class Expenses implements AfterViewInit {

   private picker?: DateRangePicker;
   private pickerExpense?: Datepicker;
   private drawer!: Drawer;
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

   // ************* || form modelo || *************
    expenseModel = signal({
        title       : '',
        description : '',
        category    : '',
        amount      : '',
        date        : '',
        cardId      : '',
    });

  // ************* || validacion y submit de formulario || *************
  expenseForm = form(
    this.expenseModel, 
    ( schema ) => {},
    { 
      submission: {
        action : async (field) => {
          return null;
        },
      }

    }
  );
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

  }

  showSidebar() {
    this.drawer.toggle();
  }

  onCategoryChange( emit:any ) {
    console.log(emit);
  }

  onCategoryChangeInput( emit:any ) {
    console.log(emit);
  }

}