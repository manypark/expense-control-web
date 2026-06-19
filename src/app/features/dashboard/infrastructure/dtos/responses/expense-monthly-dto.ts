export interface ExpenseMonthlyDto {
    id:             string;
    title:          string;
    description:    string;
    category:       string;
    amount:         number;
    incurredAt:     string;
    statementYear:  number;
    statementMonth: number;
    creditCardId:   string | null;
    userId:         string;
    createdAt:      string;
    updatedAt:      string;
    creditCard:     CreditCardDto | null;
}

export interface CreditCardDto {
    id:          string;
    alias:       string;
    bank:        string;
    last4:       string;
    closingDay:  number;
    dueDay:      number;
    creditLimit: number;
}
