import { ExpenseCategory } from "../../../shared/models";

export interface OverviewResult {
  guests: {
    wedding: {
      total: number;
      types: {
        type: number;
        amount: number;
      }[],
      staying: {
        place: string;
        amount: number;
      }[],
    },
    friday: {
      total: number;
      types: {
        type: number;
        amount: number;
      }[]
    },
    gift: number;
  };
  expenses: {
    total: Number;
    totalPaid: Number;
    categories: {
      categoryData: ExpenseCategory;
      total: number;
      totalPaid: number;
    }[]
  }
}

