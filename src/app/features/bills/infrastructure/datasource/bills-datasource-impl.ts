import { inject, Service } from "@angular/core";

import { BillMapper } from "../mappers";
import { BillDto } from "../dtos/responses";
import { BillEntity, CreateBillEntity, UpdateBillEntity } from "../../domain";
import { HttpClientService } from "../../../../core/services/http/http-services-impl";

@Service()
export class BillsDatasourceImpl {

    private readonly httpClient = inject( HttpClientService );

    async getBills(): Promise<BillEntity[]> {
        try {
            const response = await this.httpClient.get<BillDto[]>( '/bills' );
            return response.map( BillMapper.fromDto );
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }

    async createBill(bill: CreateBillEntity): Promise<BillEntity> {
        try {
            const response = await this.httpClient.post<BillDto>( '/bills', bill );
            return BillMapper.fromDto(response);
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }

    async updateBill(billId: string, bill: UpdateBillEntity): Promise<BillEntity> {
        try {
            const response = await this.httpClient.patch<BillDto>( `/bills/${billId}`, bill );
            return BillMapper.fromDto(response);
        } catch (error : any) {
            throw new Error( error?.error?.message ?? 'Unexpected error' );
        }
    }
}