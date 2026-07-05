export interface CreateExpenseEntity {
    title:         string;
    description:   string;
    category:      string;
    amount:        number;
    incurredAt:    string;
    statementYear: number;
    statementMonth:number;
    creditCardId:  string | null;
}

export interface ExpenseEntity extends CreateExpenseEntity {
    id:        string;
    userId:    string;
    createdAt: Date;
    updatedAt: Date;
}
