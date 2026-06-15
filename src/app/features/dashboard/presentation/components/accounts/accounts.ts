import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { AccountsServices } from '../../signals';

@Component({
  selector    : 'app-accounts',
  templateUrl : './accounts.html',
  styleUrl    : './accounts.css',
  imports     : [ DecimalPipe ],
})
export default class Accounts {

  readonly accountsServices = inject(AccountsServices);

  readonly totalBalance = computed(() => {
  const accounts = this.accountsServices.accountsQuery.data() ?? [];

  return accounts.reduce(
    (total, account) => total + account.balance,
    0
  );
});
  
}