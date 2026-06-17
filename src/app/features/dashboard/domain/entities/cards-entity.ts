export interface CardsEntity {
    id:          string;
    alias:       string;
    bank:        string;
    last4:       string;
    closingDay:  number;
    dueDay:      number;
    creditLimit: number;
    userId:      string;
    createdAt:   Date;
    updatedAt:   Date;
}