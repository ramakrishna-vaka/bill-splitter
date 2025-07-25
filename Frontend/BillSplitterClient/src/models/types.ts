export interface Person {
  id: number;
  name: string;
  color: string;
  isActive: boolean;
}

export interface Bill {
  id: number;
  description: string;
  amount: string;
  paidBy: number;
  splitAmong: number[];
  category: string;
}

export interface Results {
  totalCalculated: number;
  totalEntered: number;
  personBalances: { [key: number]: { name: string; paid: number; owes: number; balance: number } };
  isValid: boolean;
}

export enum BillCategory {
  Food = '🍽️ Food',
  Transport = '🚗 Transport',
  Utilities = '🏠 Utilities',
  Entertainment = '🎉 Entertainment',
  Shopping = '🛒 Shopping',
  Health = '💊 Health',
  Other = '📚 Other'
}

