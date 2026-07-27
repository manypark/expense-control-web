import { Component, inject, output } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

import { RecentTransactionsFilterServices } from '../signals';
import { RecentTransactionEntity } from '../../../../entities';
import { BreakpointObserverServices } from '../../../../services/breakpointObserver';

@Component({
  selector    : 'app-common-table',
  templateUrl : './common-table.html',
  styleUrl    : './common-table.css',
  imports     : [
    DatePipe,
    DecimalPipe,
  ],
})
export class CommonTable {

  readonly recetnTrasacntionFilterServices = inject(RecentTransactionsFilterServices);
  editExpense = output<RecentTransactionEntity>();
  deleteExpense = output<RecentTransactionEntity>();
  breakpointObsServices = inject(BreakpointObserverServices);

  onEditExpense(expense: RecentTransactionEntity) {
    this.editExpense.emit(expense);
  }

  onDeleteExpense(expense: RecentTransactionEntity) {
    this.deleteExpense.emit(expense);
  }

}
