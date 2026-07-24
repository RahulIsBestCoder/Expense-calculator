import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, DollarSign, Calendar, Tag, CreditCard, FileText } from 'lucide-react';
import { Expense, FinancialCategory, FunctionalCategory, PaymentMethod, MasterExpenseItem } from '../types';
import { FINANCIAL_CATEGORIES, FUNCTIONAL_CATEGORIES } from '../data/masterCatalog';

interface ExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expenseData: Omit<Expense, 'id' | 'createdAt'>, initialId?: string) => void;
  initialExpense?: Expense | null;
  catalog: MasterExpenseItem[];
  getSuggestionForName: (name: string) => { financialCategory?: FinancialCategory; functionalCategory?: FunctionalCategory } | null;
  saveCatalogItem: (item: MasterExpenseItem) => void;
  currency: string;
}

export const ExpenseFormModal: React.FC<ExpenseFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialExpense,
  catalog,
  getSuggestionForName,
  saveCatalogItem,
  currency,
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [financialCategory, setFinancialCategory] = useState<FinancialCategory>('Need');
  const [functionalCategory, setFunctionalCategory] = useState<FunctionalCategory>('Food');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [note, setNote] = useState('');
  const [autoFilled, setAutoFilled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter catalog for autocomplete dropdown
  const suggestions = catalog.filter(
    (item) =>
      title.trim().length > 0 &&
      item.name.toLowerCase().includes(title.trim().toLowerCase()) &&
      item.name.toLowerCase() !== title.trim().toLowerCase()
  );

  useEffect(() => {
    if (initialExpense) {
      setTitle(initialExpense.title);
      setAmount(initialExpense.amount.toString());
      setDate(initialExpense.date);
      setFinancialCategory(initialExpense.financialCategory);
      setFunctionalCategory(initialExpense.functionalCategory);
      setPaymentMethod(initialExpense.paymentMethod);
      setNote(initialExpense.note || '');
      setAutoFilled(false);
    } else {
      setTitle('');
      setAmount('');
      setDate(new Date().toISOString().slice(0, 10));
      setFinancialCategory('Need');
      setFunctionalCategory('Food');
      setPaymentMethod('Cash');
      setNote('');
      setAutoFilled(false);
    }
  }, [initialExpense, isOpen]);

  // Handle Title change & Master Catalog Auto-fill (FR-3)
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setShowSuggestions(true);

    const suggestion = getSuggestionForName(val);
    if (suggestion) {
      if (suggestion.financialCategory) setFinancialCategory(suggestion.financialCategory);
      if (suggestion.functionalCategory) setFunctionalCategory(suggestion.functionalCategory);
      setAutoFilled(true);
    } else {
      setAutoFilled(false);
    }
  };

  const selectSuggestion = (item: MasterExpenseItem) => {
    setTitle(item.name);
    setFinancialCategory(item.financialCategory);
    setFunctionalCategory(item.functionalCategory);
    setAutoFilled(true);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numAmount) || numAmount <= 0) return;

    // Save expense
    onSave(
      {
        title: title.trim(),
        amount: numAmount,
        date,
        financialCategory,
        functionalCategory,
        paymentMethod,
        note: note.trim(),
      },
      initialExpense ? initialExpense.id : undefined
    );

    // Save to Master Catalog
    saveCatalogItem({
      name: title.trim(),
      financialCategory,
      functionalCategory,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-all">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div>
            <h3 className="text-lg font-bold text-white">
              {initialExpense ? 'Edit Expense Record' : 'Record New Expense'}
            </h3>
            <p className="text-xs text-slate-400">Master Catalog auto-categorizes your expenses</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Expense Name with Master Catalog Auto-fill */}
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Expense Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="e.g. Breakfast, Petrol, Bag, Electricity Bill"
                className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                required
              />
              {autoFilled && (
                <div className="absolute right-3 top-2.5 flex items-center space-x-1 text-emerald-400 text-xs bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  <Sparkles className="w-3 h-3" />
                  <span>Auto-filled</span>
                </div>
              )}
            </div>

            {/* Catalog Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-20 max-h-40 overflow-y-auto">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectSuggestion(item)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-700 text-xs flex items-center justify-between text-slate-200"
                  >
                    <span className="font-medium text-white">{item.name}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      {item.financialCategory} • {item.functionalCategory}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Amount & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Amount ({currency}) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-medium text-sm">
                  {currency}
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-xl pl-8 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Date <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

          </div>

          {/* Financial Category Selector (FR-4: Need, Want, Desire, Miscellaneous) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Financial Category <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FINANCIAL_CATEGORIES.map((fc) => (
                <button
                  key={fc}
                  type="button"
                  onClick={() => setFinancialCategory(fc)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                    financialCategory === fc
                      ? fc === 'Need'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold shadow-sm'
                        : fc === 'Want'
                        ? 'bg-blue-500/20 border-blue-500 text-blue-300 font-semibold shadow-sm'
                        : fc === 'Desire'
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300 font-semibold shadow-sm'
                        : 'bg-slate-700 border-slate-500 text-slate-200 font-semibold'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {fc}
                </button>
              ))}
            </div>
          </div>

          {/* Functional Category Selector (FR-5: Food, Transport, Shopping, etc.) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Functional Category <span className="text-rose-400">*</span>
            </label>
            <select
              value={functionalCategory}
              onChange={(e) => setFunctionalCategory(e.target.value as FunctionalCategory)}
              className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
            >
              {FUNCTIONAL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
            >
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Digital Wallet">Digital Wallet</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Notes / Description (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add extra context, invoice details or store location..."
              rows={2}
              className="w-full bg-slate-800/80 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
            />
          </div>

          {/* Form Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-5 py-2 rounded-xl text-xs shadow-lg transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{initialExpense ? 'Save Changes' : 'Record Expense'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
