export interface RecentTransactionEntity {
    id:             string;
    title:          string;
    description:    string;
    category:       string;
    amount:         number;
    incurredAt:     Date;
    statementYear:  number;
    statementMonth: number;
    creditCardId?:   string;
    userId:         string;
    createdAt:      Date;
    updatedAt:      Date;
    creditCard?:     CreditCardEntity;
}

export interface CreditCardEntity {
    id:          string;
    alias:       string;
    bank:        string;
    last4:       string;
    closingDay:  number;
    dueDay:      number;
    creditLimit: number;
}