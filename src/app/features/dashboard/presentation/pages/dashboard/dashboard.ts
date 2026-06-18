import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { AccountsServices } from '../../signals';
import { Accounts, Cards, ExpenseMonthly, RecentTransaction } from '../../components';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.html',
  styleUrl    : './dashboard.css',
  imports: [
    Cards,
    Accounts,
    DecimalPipe,
    ExpenseMonthly,
    RecentTransaction
],
})
export default class Dashboard {

  constructor(readonly accountsServices: AccountsServices) {}

  readonly categories = [
    { label: 'Alimentos', value: 40, color: 'bg-blue-700' },
    { label: 'Servicios', value: 25, color: 'bg-blue-400' },
    { label: 'Otros', value: 35, color: 'bg-gray-300' },
  ];

  readonly expensesByCard = [
    { card: 'Amex Gold', amount: 1245, progress: 64 },
    { card: 'Visa Infinite', amount: 842.10, progress: 44 },
  ];

}