import { Expense } from './';

export class ExpenseCategory {
    _id: string;
    name: string;
    icon: string;
    class: string;
    excludeFromTotal: boolean;
    lastModified: Date;
    expenses: Expense[];
}