import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { CommonButton } from '../../../../shared/components/inputs';
import { CardsServices } from '../../../../dashboard/presentation/signals';

@Component({
  selector    : 'app-cards-management',
  templateUrl : './cards-management.html',
  styleUrl    : './cards-management.css',
  imports     : [
    DecimalPipe,
    CommonButton,
  ],
})
export class CardsManagement {

  readonly cardsServices = inject( CardsServices );

  readonly cards = computed(() => this.cardsServices.accountsQuery.data() ?? []);

  creditUsage(creditLimit: number): string {
    const maxLimit = Math.max( ...this.cards().map( card => card.creditLimit ), 1 );
    return `${Math.max( (creditLimit / maxLimit) * 100, 8 )}%`;
  }
}