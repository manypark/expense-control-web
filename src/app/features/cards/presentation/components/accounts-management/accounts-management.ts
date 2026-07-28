import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CommonButton } from '../../../../shared/components/inputs';
import { AccountsServices } from '../../../../dashboard/presentation/signals';

@Component({
  selector    : 'app-accounts-management',
  templateUrl : './accounts-management.html',
  styleUrl    : './accounts-management.css',
  imports     : [
    CommonButton,
    DecimalPipe,
  ],
})
export class AccountsManagement {
  public accountServices = inject(AccountsServices);
}