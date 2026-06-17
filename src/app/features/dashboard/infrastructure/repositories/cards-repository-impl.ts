import { inject, Service } from "@angular/core";

import { CardsEntity } from "../../domain/entities";
import { CardsDatasourceImpl } from "../datasource";
import { CardsRepository } from "../../domain/repositories";

@Service()
export class CardsRepositoryImpl implements CardsRepository {
    
    private cardsDatasource = inject( CardsDatasourceImpl );

    getCardsInfo(): Promise<CardsEntity[]> {
        return this.cardsDatasource.getCardsInfo();
    }
}