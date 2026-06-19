import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { AccountsServices } from '../../signals';

@Component({
  selector    : 'app-actives-accounts',
  templateUrl : './actives-accounts.html',
  styleUrl    : './actives-accounts.css',
  imports     : [
    DecimalPipe,
  ],
})
export class ActivesAccounts {

  constructor(readonly accountsServices: AccountsServices) {}
  
}