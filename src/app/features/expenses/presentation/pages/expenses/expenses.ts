import { AfterViewInit, Component } from '@angular/core';

import { Drawer } from 'flowbite';
import { CommonButton } from "../../../../shared/components/inputs";
import { DateRangePicker } from 'flowbite-datepicker';
import { CommonTable } from "../../../../shared/components/common-table/presentation/pages/common-table";

@Component({
  selector    : 'app-expenses',
  templateUrl : './expenses.html',
  styleUrl    : './expenses.css',
  imports: [CommonButton, CommonTable],
})

export default class Expenses implements AfterViewInit {

   private picker?: DateRangePicker;

  ngAfterViewInit(): void {

    const element = document.getElementById('date-range-picker');

    if (!element) {
      return;
    }

    this.picker = new DateRangePicker(element, {
      autohide: true,
      format: 'dd/mm/yyyy'
    });

  }

  // showSidebar() {
  //   const target = document.getElementById('drawer-navigation');
  //   const drawer = new Drawer(target!);
  //   drawer.show();
  //   setTimeout(() => {
  //     drawer.hide();
  //   }, 2000);
  // }

}