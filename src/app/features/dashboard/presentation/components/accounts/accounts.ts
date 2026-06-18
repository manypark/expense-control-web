import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { AccountsServices } from '../../signals';
import { AccountsEntity } from '../../../domain/entities';

@Component({
  selector    : 'app-accounts',
  templateUrl : './accounts.html',
  styleUrl    : './accounts.css',
  imports     : [ DecimalPipe ],
})
export class Accounts {

  readonly accountsServices = inject(AccountsServices);

  readonly totalBalance = computed(() => {
    const accounts = this.accountsServices.accountsQuery.data() ?? [];
    return accounts.reduce( (total, account) => total + account.balance, 0 );
  });

  readonly accounts = computed( () => {
    const accounts = this.accountsServices.accountsQuery.data() ?? [];
    return [ ...accounts ].sort( (current: AccountsEntity, next: AccountsEntity) => next.balance - current.balance );
  });

  barWidth(account: AccountsEntity): string {
    const total = this.totalBalance();
    if (!total) return '0%';

    return `${Math.max( (account.balance / total) * 100, 4 )}%`;
  }
  
}
