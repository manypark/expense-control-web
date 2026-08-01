import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';

import { Drawer } from 'flowbite';

import { AccountFormService } from '../../services';
import { CommonButton } from '../../../../shared/components/inputs';
import { AccountsEntity } from '../../../../dashboard/domain/entities';
import { AccountsServices } from '../../../../dashboard/presentation/signals';

@Component({
  selector    : 'app-accounts-management',
  templateUrl : './accounts-management.html',
  styleUrl    : './accounts-management.css',
  imports     : [
    CommonButton,
    DecimalPipe,
    FormField,
    FormRoot,
  ],
})
export class AccountsManagement {
  readonly accountServices = inject(AccountsServices);
  readonly accountFormService = inject(AccountFormService);
  
  readonly isAccountDrawerOpen = signal(false);

  private drawer?: Drawer;

  constructor() {
    this.accountFormService.onAccountSaved = () => this.closeAccountDrawer(false);
  }

  openCreateAccountDrawer() {
    this.accountFormService.resetForm();
    this.openAccountDrawer();
  }

  openEditAccountDrawer(account: AccountsEntity) {
    this.accountFormService.setAccountToEdit(account);
    this.openAccountDrawer();
  }

  closeAccountDrawer(resetForm = true) {
    this.drawer?.hide();
    this.drawer = undefined;
    this.isAccountDrawerOpen.set(false);

    if (resetForm) {
      this.accountFormService.resetForm();
    }
  }

  private openAccountDrawer() {
    this.isAccountDrawerOpen.set(true);

    setTimeout(() => {
      this.initializeAccountDrawer();
      this.drawer?.show();
    });
  }

  private initializeAccountDrawer() {
    const target = document.getElementById('account-drawer');

    if (!target) { return; }

    this.drawer = new Drawer(target);
  }
}