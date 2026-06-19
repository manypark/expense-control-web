import { Component } from '@angular/core';

import { Accounts, Cards, ExpenseMonthly, RecentTransaction, ActivesAccounts, ResumeCategories } from '../../components';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.html',
  styleUrl    : './dashboard.css',
  imports: [
    Cards,
    Accounts,
    ExpenseMonthly,
    ActivesAccounts,
    RecentTransaction,
    ResumeCategories
  ],
})
export default class Dashboard {}