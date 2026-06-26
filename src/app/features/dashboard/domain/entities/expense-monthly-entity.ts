import { CreditCardEntity } from "../../../shared/entities/recent-transaction";

export interface ExpenseMonthlyEntity {
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
    creditCard:     CreditCardEntity | null;
}