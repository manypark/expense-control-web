import { CardsEntity } from "../entities";

export abstract class CardsRepository {
    abstract getCardsInfo():Promise<CardsEntity[]>;
}