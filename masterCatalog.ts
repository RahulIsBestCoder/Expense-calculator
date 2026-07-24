export type FinancialCategory = 'Need' | 'Want' | 'Desire' | 'Miscellaneous';

export type FunctionalCategory = 
  | 'Food' 
  | 'Transport' 
  | 'Shopping' 
  | 'Health' 
  | 'Personal Care' 
  | 'Education' 
  | 'Bills' 
  | 'Household' 
  | 'Entertainment' 
  | 'Travel' 
  | 'Miscellaneous';

export type PaymentMethod = 
  | 'Cash' 
  | 'Credit Card' 
  | 'Debit Card' 
  | 'Bank Transfer' 
  | 'Digital Wallet' 
  | 'Other';

export interface Expense {
  id: string;
  userId?: string;
  date: string; // YYYY-MM-DD
  title: string; // Expense Name e.g. Breakfast, Petrol, Bag
  amount: number;
  financialCategory: FinancialCategory;
  functionalCategory: FunctionalCategory;
  paymentMethod: PaymentMethod;
  note?: string;
  createdAt: number;
  updatedAt?: number;
}

export interface MasterExpenseItem {
  name: string;
  financialCategory: FinancialCategory;
  functionalCategory: FunctionalCategory;
  userId?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface ExpenseFilterState {
  search: string;
  financialCategory: string; // 'all' or FinancialCategory
  functionalCategory: string; // 'all' or FunctionalCategory
  paymentMethod: string; // 'all' or PaymentMethod
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  minAmount?: number;
  maxAmount?: number;
}

export interface DashboardStats {
  todayTotal: number;
  weeklyTotal: number;
  monthlyTotal: number;
  yearlyTotal: number;
  avgDailyExpense: number;
  highestSpendingDay: { date: string; amount: number };
  financialBreakdown: {
    Need: number;
    Want: number;
    Desire: number;
    Miscellaneous: number;
  };
  functionalBreakdown: Record<FunctionalCategory, number>;
  totalCount: number;
}

export interface TimeChartPoint {
  label: string;
  date: string;
  amount: number;
  expensesCount: number;
  Need?: number;
  Want?: number;
  Desire?: number;
}

export interface CalculatorHistoryItem {
  id: string;
  expression: string;
  result: number;
  timestamp: string;
}
