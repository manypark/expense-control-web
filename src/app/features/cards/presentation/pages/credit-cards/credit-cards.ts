import { Component } from '@angular/core';

import { AccountsManagement, CardsManagement, FinanceHeader } from '../../components';

@Component({
  selector    : 'app-credit-cards',
  templateUrl : './credit-cards.html',
  styleUrl    : './credit-cards.css',
  imports     : [AccountsManagement, CardsManagement, FinanceHeader],
})

export default class CreditCards {}
