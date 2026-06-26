import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

import { RecentTransactionsFilterServices } from '../signals';

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

}