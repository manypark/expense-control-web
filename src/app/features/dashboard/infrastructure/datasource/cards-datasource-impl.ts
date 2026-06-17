import { inject, Service } from "@angular/core";

import { CardsEntity } from "../../domain/entities";
import { HttpClientService } from "../../../../core/services/http/http-services-impl";

@Service()
export class CardsDatasourceImpl {

    private httpClient = inject( HttpClientService );

    async getCardsInfo() : Promise<CardsEntity[]> {
        try {
            return await this.httpClient.get( '/cards' );
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }   
}