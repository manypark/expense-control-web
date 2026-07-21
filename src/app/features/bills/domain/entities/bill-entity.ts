export interface BillEntity {
    id:        string;
    title:     string;
    dueDate:   Date;
    isPaid:    boolean;
    amount?:   number;
    userId:    string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBillEntity {
    title:   string;
    dueDate: string;
    isPaid:  boolean;
}

export type UpdateBillEntity = Partial<CreateBillEntity>;
