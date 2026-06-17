import { inject, Service } from "@angular/core";

import { CardsEntity } from "../entities";
import { CardsRepository } from "../repositories";

@Service()
export class CardsUsecase {

    private cardsRepository = inject( CardsRepository );

    execute() : Promise<CardsEntity[]> {
        return this.cardsRepository.getCardsInfo();
    }
}