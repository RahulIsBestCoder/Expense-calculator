import { MasterExpenseItem, FinancialCategory, FunctionalCategory } from '../types';

export const DEFAULT_MASTER_CATALOG: MasterExpenseItem[] = [
  // Food
  { name: 'Breakfast', financialCategory: 'Need', functionalCategory: 'Food' },
  { name: 'Lunch', financialCategory: 'Need', functionalCategory: 'Food' },
  { name: 'Dinner', financialCategory: 'Need', functionalCategory: 'Food' },
  { name: 'Groceries', financialCategory: 'Need', functionalCategory: 'Food' },
  { name: 'Coffee / Tea', financialCategory: 'Want', functionalCategory: 'Food' },
  { name: 'Snacks & Desserts', financialCategory: 'Want', functionalCategory: 'Food' },
  { name: 'Restaurant Dining', financialCategory: 'Want', functionalCategory: 'Food' },
  
  // Transport
  { name: 'Petrol / Fuel', financialCategory: 'Need', functionalCategory: 'Transport' },
  { name: 'Bus / Metro Pass', financialCategory: 'Need', functionalCategory: 'Transport' },
  { name: 'Taxi / Rideshare', financialCategory: 'Want', functionalCategory: 'Transport' },
  { name: 'Car Maintenance', financialCategory: 'Need', functionalCategory: 'Transport' },
  { name: 'Parking Fee', financialCategory: 'Need', functionalCategory: 'Transport' },

  // Shopping
  { name: 'Bag', financialCategory: 'Want', functionalCategory: 'Shopping' },
  { name: 'Apparel & Clothes', financialCategory: 'Want', functionalCategory: 'Shopping' },
  { name: 'Footwear & Shoes', financialCategory: 'Want', functionalCategory: 'Shopping' },
  { name: 'Gadgets & Electronics', financialCategory: 'Desire', functionalCategory: 'Shopping' },
  { name: 'Luxury Accessories', financialCategory: 'Desire', functionalCategory: 'Shopping' },

  // Health
  { name: 'Doctor Consultation', financialCategory: 'Need', functionalCategory: 'Health' },
  { name: 'Medicines & Pharmacy', financialCategory: 'Need', functionalCategory: 'Health' },
  { name: 'Health Insurance', financialCategory: 'Need', functionalCategory: 'Health' },
  { name: 'Gym & Fitness', financialCategory: 'Want', functionalCategory: 'Health' },

  // Personal Care
  { name: 'Haircut & Grooming', financialCategory: 'Need', functionalCategory: 'Personal Care' },
  { name: 'Skincare & Cosmetics', financialCategory: 'Want', functionalCategory: 'Personal Care' },
  { name: 'Spa & Massage', financialCategory: 'Desire', functionalCategory: 'Personal Care' },

  // Education
  { name: 'Tuition Fee', financialCategory: 'Need', functionalCategory: 'Education' },
  { name: 'Books & Stationery', financialCategory: 'Need', functionalCategory: 'Education' },
  { name: 'Online Course & Certification', financialCategory: 'Want', functionalCategory: 'Education' },

  // Bills
  { name: 'Electricity Bill', financialCategory: 'Need', functionalCategory: 'Bills' },
  { name: 'Water & Gas Bill', financialCategory: 'Need', functionalCategory: 'Bills' },
  { name: 'Internet / WiFi', financialCategory: 'Need', functionalCategory: 'Bills' },
  { name: 'Mobile Recharge / Plan', financialCategory: 'Need', functionalCategory: 'Bills' },

  // Household
  { name: 'House Rent', financialCategory: 'Need', functionalCategory: 'Household' },
  { name: 'Furniture', financialCategory: 'Want', functionalCategory: 'Household' },
  { name: 'Home Cleaning Supplies', financialCategory: 'Need', functionalCategory: 'Household' },

  // Entertainment
  { name: 'Movie Tickets', financialCategory: 'Want', functionalCategory: 'Entertainment' },
  { name: 'Streaming Subscription', financialCategory: 'Want', functionalCategory: 'Entertainment' },
  { name: 'Concert / Event Pass', financialCategory: 'Desire', functionalCategory: 'Entertainment' },
  { name: 'Gaming Purchase', financialCategory: 'Desire', functionalCategory: 'Entertainment' },

  // Travel
  { name: 'Flight Tickets', financialCategory: 'Want', functionalCategory: 'Travel' },
  { name: 'Hotel / Resort Stay', financialCategory: 'Desire', functionalCategory: 'Travel' },
  { name: 'Vacation Sightseeing', financialCategory: 'Desire', functionalCategory: 'Travel' },

  // Miscellaneous
  { name: 'Gift / Donation', financialCategory: 'Miscellaneous', functionalCategory: 'Miscellaneous' },
  { name: 'Bank Charges / Fees', financialCategory: 'Need', functionalCategory: 'Miscellaneous' },
];

export const FINANCIAL_CATEGORIES: FinancialCategory[] = ['Need', 'Want', 'Desire', 'Miscellaneous'];

export const FUNCTIONAL_CATEGORIES: FunctionalCategory[] = [
  'Food',
  'Transport',
  'Shopping',
  'Health',
  'Personal Care',
  'Education',
  'Bills',
  'Household',
  'Entertainment',
  'Travel',
  'Miscellaneous',
];

export const FUNCTIONAL_CATEGORY_COLORS: Record<FunctionalCategory, string> = {
  Food: '#F59E0B',
  Transport: '#3B82F6',
  Shopping: '#EC4899',
  Health: '#EF4444',
  'Personal Care': '#14B8A6',
  Education: '#F97316',
  Bills: '#10B981',
  Household: '#6366F1',
  Entertainment: '#8B5CF6',
  Travel: '#06B6D4',
  Miscellaneous: '#64748B',
};

export const FINANCIAL_CATEGORY_COLORS: Record<FinancialCategory, string> = {
  Need: '#10B981',        // Emerald green
  Want: '#3B82F6',        // Vibrant blue
  Desire: '#8B5CF6',      // Purple
  Miscellaneous: '#64748B' // Slate
};
