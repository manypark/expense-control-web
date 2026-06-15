import { Component } from '@angular/core';

import Accounts from '../../components/accounts/accounts';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.html',
  styleUrl    : './dashboard.css',
  imports: [
    Accounts
  ],
})

export default class Dashboard {}