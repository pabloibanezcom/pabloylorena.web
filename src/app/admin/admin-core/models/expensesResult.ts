import { Result } from ".";
import { Expense } from "../../../shared/models";

export class ExpensesResult implements Result {
    elements: Expense[];
    amount: number;
    amountPaid: number;
}