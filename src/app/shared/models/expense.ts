import { ExpenseGroup } from ".";

export class Expense {
    _id: string;
    description: string;
    payeer: string;
    provider: string;
    amount: number;
    amountPaid: number;
    costPerGuest: boolean;
    lastModified: Date;
    group: ExpenseGroup[];
}