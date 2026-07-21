export interface BillDto {
    id:        string;
    title:     string;
    dueDate:   string;
    isPaid:    boolean;
    amount?:   number;
    userId:    string;
    createdAt: string;
    updatedAt: string;
}
