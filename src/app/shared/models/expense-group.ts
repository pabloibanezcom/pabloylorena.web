import { Expense } from './';

export class ExpenseGroup {
    _id: string;
    name: string;
    icon: string;
    lastModified: Date;
    expenses: Expense[];
}