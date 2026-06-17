import { Component } from '@angular/core';

import { Accounts, Cards } from '../../components';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.html',
  styleUrl    : './dashboard.css',
  imports: [
    Cards,
    Accounts,
],
})

export default class Dashboard {}