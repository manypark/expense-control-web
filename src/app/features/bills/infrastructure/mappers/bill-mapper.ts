import { BillEntity } from "../../domain";
import { BillDto } from "../dtos/responses";

export class BillMapper {

    static fromDto(dto: BillDto): BillEntity {
        return {
            id       : dto.id,
            title    : dto.title,
            dueDate  : new Date(dto.dueDate),
            isPaid   : dto.isPaid,
            amount   : dto.amount,
            userId   : dto.userId,
            createdAt: new Date(dto.createdAt),
            updatedAt: new Date(dto.updatedAt),
        };
    }
}
