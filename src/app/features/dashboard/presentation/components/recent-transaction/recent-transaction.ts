import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

import { RecentTransactionsServices } from '../../signals';

@Component({
  selector    : 'app-recent-transaction',
  templateUrl : './recent-transaction.html',
  styleUrl    : './recent-transaction.css',
  imports     : [
    DatePipe,
    DecimalPipe,
  ],
})
export class RecentTransaction {
  readonly recentTransactionServices = inject(RecentTransactionsServices);
}