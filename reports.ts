import { Expense } from '../types';

export function generateSampleExpenses(userId?: string): Expense[] {
  const samples: Omit<Expense, 'id' | 'createdAt'>[] = [
    // Today
    { title: 'Breakfast', amount: 8.50, financialCategory: 'Need', functionalCategory: 'Food', date: formatDateOffset(0), paymentMethod: 'Credit Card', note: 'Morning coffee & toast' },
    { title: 'Bus / Metro Pass', amount: 35.00, financialCategory: 'Need', functionalCategory: 'Transport', date: formatDateOffset(0), paymentMethod: 'Debit Card', note: 'Weekly transit refill' },
    
    // Yesterday
    { title: 'Groceries', amount: 112.40, financialCategory: 'Need', functionalCategory: 'Food', date: formatDateOffset(-1), paymentMethod: 'Credit Card', note: 'Fresh produce & pantry' },
    { title: 'Medicines & Pharmacy', amount: 28.15, financialCategory: 'Need', functionalCategory: 'Health', date: formatDateOffset(-1), paymentMethod: 'Digital Wallet', note: 'Vitamins & Painkillers' },

    // 2 days ago
    { title: 'Electricity Bill', amount: 84.20, financialCategory: 'Need', functionalCategory: 'Bills', date: formatDateOffset(-2), paymentMethod: 'Bank Transfer', note: 'Monthly power utility' },
    { title: 'Coffee / Tea', amount: 4.75, financialCategory: 'Want', functionalCategory: 'Food', date: formatDateOffset(-2), paymentMethod: 'Cash', note: 'Espresso at workplace' },

    // 3 days ago
    { title: 'Restaurant Dining', amount: 48.00, financialCategory: 'Want', functionalCategory: 'Food', date: formatDateOffset(-3), paymentMethod: 'Credit Card', note: 'Dinner with colleagues' },
    { title: 'Books & Stationery', amount: 22.50, financialCategory: 'Need', functionalCategory: 'Education', date: formatDateOffset(-3), paymentMethod: 'Cash', note: 'Technical guide' },

    // 4 days ago
    { title: 'Petrol / Fuel', amount: 45.00, financialCategory: 'Need', functionalCategory: 'Transport', date: formatDateOffset(-4), paymentMethod: 'Debit Card', note: 'Car gas tank' },
    { title: 'Movie Tickets', amount: 32.00, financialCategory: 'Want', functionalCategory: 'Entertainment', date: formatDateOffset(-4), paymentMethod: 'Digital Wallet', note: 'Weekend cinema' },

    // 5 days ago
    { title: 'House Rent', amount: 1200.00, financialCategory: 'Need', functionalCategory: 'Household', date: formatDateOffset(-5), paymentMethod: 'Bank Transfer', note: 'Monthly apartment rent' },
    { title: 'Internet / WiFi', amount: 60.00, financialCategory: 'Need', functionalCategory: 'Bills', date: formatDateOffset(-5), paymentMethod: 'Bank Transfer', note: 'High speed fiber' },

    // 6 days ago
    { title: 'Bag', amount: 110.00, financialCategory: 'Want', functionalCategory: 'Shopping', date: formatDateOffset(-6), paymentMethod: 'Credit Card', note: 'Leather backpack' },
    { title: 'Haircut & Grooming', amount: 35.00, financialCategory: 'Need', functionalCategory: 'Personal Care', date: formatDateOffset(-6), paymentMethod: 'Cash' },

    // Past week entries
    { title: 'Snacks & Desserts', amount: 16.80, financialCategory: 'Want', functionalCategory: 'Food', date: formatDateOffset(-8), paymentMethod: 'Debit Card' },
    { title: 'Gadgets & Electronics', amount: 249.00, financialCategory: 'Desire', functionalCategory: 'Shopping', date: formatDateOffset(-10), paymentMethod: 'Credit Card', note: 'Wireless noise cancelling headphones' },
    { title: 'Doctor Consultation', amount: 75.00, financialCategory: 'Need', functionalCategory: 'Health', date: formatDateOffset(-12), paymentMethod: 'Bank Transfer' },
    { title: 'Online Course & Certification', amount: 89.00, financialCategory: 'Want', functionalCategory: 'Education', date: formatDateOffset(-14), paymentMethod: 'Credit Card' },

    // Earlier this month / past month
    { title: 'Apparel & Clothes', amount: 145.00, financialCategory: 'Want', functionalCategory: 'Shopping', date: formatDateOffset(-18), paymentMethod: 'Credit Card' },
    { title: 'Taxi / Rideshare', amount: 38.50, financialCategory: 'Want', functionalCategory: 'Transport', date: formatDateOffset(-20), paymentMethod: 'Digital Wallet' },
    { title: 'Concert / Event Pass', amount: 120.00, financialCategory: 'Desire', functionalCategory: 'Entertainment', date: formatDateOffset(-22), paymentMethod: 'Credit Card' },
    { title: 'Vacation Sightseeing', amount: 210.00, financialCategory: 'Desire', functionalCategory: 'Travel', date: formatDateOffset(-25), paymentMethod: 'Credit Card' },
  ];

  return samples.map((item, idx) => ({
    ...item,
    id: `sample-${idx + 1}`,
    userId: userId || 'local_guest',
    createdAt: Date.now() - (idx * 3600000),
  }));
}

function formatDateOffset(daysOffset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
