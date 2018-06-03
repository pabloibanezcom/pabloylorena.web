import { ExpenseCategory } from ".";

export class Expense {
    _id: string;
    description: string;
    payeer: string;
    provider: string;
    amount: number;
    amountPaid: number;
    costPerGuest: number;
    lastModified: Date;
    category: ExpenseCategory;
}