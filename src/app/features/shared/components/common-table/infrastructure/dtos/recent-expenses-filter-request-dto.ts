import { RecentExpensesFilterParamsEntity } from "../../domain";

export interface RecentExpensesFilterRequestDto {
    limit:   number;
    offset:  number;
    from?:   string | null;
    to?:     string | null;
}

export function toRecentExpensesFilterRequestDto(params: RecentExpensesFilterParamsEntity): RecentExpensesFilterRequestDto {
    return {
        limit : params.limit,
        offset: params.offset,
        from  : params.from,
        to    : params.to,
    };
}
