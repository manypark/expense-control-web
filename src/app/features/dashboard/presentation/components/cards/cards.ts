import { Component, inject } from '@angular/core';
import { CardsServices } from '../../signals/cardsServices';

@Component({
  selector    : 'app-cards',
  templateUrl : './cards.html',
  styleUrl    : './cards.css',
  imports     : [],
})
export class Cards {

  readonly casrdServices = inject( CardsServices);
}
