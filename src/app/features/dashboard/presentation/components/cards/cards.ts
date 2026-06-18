import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { CardsServices } from '../../signals/cardsServices';

@Component({
  selector    : 'app-cards',
  templateUrl : './cards.html',
  styleUrl    : './cards.css',
  imports     : [ DecimalPipe ],
})
export class Cards {

  readonly cardsServices = inject( CardsServices );

  readonly cards = computed(() => this.cardsServices.accountsQuery.data() ?? []);

  creditUsage(creditLimit: number): string {
    const maxLimit = Math.max( ...this.cards().map( card => card.creditLimit ), 1 );
    return `${Math.max( (creditLimit / maxLimit) * 100, 8 )}%`;
  }
}
