import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useExpenses } from './hooks/useExpenses';
import { useMasterCatalog } from './hooks/useMasterCatalog';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ExpensesListView } from './components/ExpensesListView';
import { MasterCatalogView } from './components/MasterCatalogView';
import { ReportsView } from './components/ReportsView';
import { CalculatorView } from './components/CalculatorView';
import { ExpenseFormModal } from './components/ExpenseFormModal';
import { Expense } from './types';
import { Check, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses' | 'catalog' | 'reports' | 'calculator'>('dashboard');
  const [currency, setCurrency] = useState<string>('$');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Edit state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Hooks
  const { user, userProfile, loginWithGoogle, logout, authError } = useAuth();
  const { expenses, syncStatus, addExpense, updateExpense, deleteExpense, dashboardStats } = useExpenses(user);
  const { catalog, getSuggestionForName, saveCatalogItem } = useMasterCatalog(user);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenAddModal = () => {
    setEditingExpense(null);
    setIsAddModalOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsAddModalOpen(true);
  };

  const handleSaveExpense = (data: Omit<Expense, 'id' | 'createdAt'>, initialId?: string) => {
    if (initialId && editingExpense) {
      updateExpense({
        ...editingExpense,
        ...data,
      });
      showToast('Expense updated successfully');
    } else {
      addExpense(data);
      showToast('New expense recorded');
    }
  };

  const handleDeleteExpense = (id: string) => {
    deleteExpense(id);
    showToast('Expense record deleted');
  };

  const handleAddFromCalculator = (amount: number) => {
    setEditingExpense(null);
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Auth Error Banner if any */}
      {authError && (
        <div className="bg-rose-500/10 border-b border-rose-500/20 text-rose-300 px-4 py-2 text-xs flex items-center justify-center space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <span>{authError}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={handleOpenAddModal}
        userProfile={userProfile}
        onLogin={loginWithGoogle}
        onLogout={logout}
        currency={currency}
        setCurrency={setCurrency}
        syncStatus={syncStatus}
      />

      {/* Main App Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {activeTab === 'dashboard' && (
          <DashboardView
            stats={dashboardStats}
            expenses={expenses}
            currency={currency}
            onOpenAddModal={handleOpenAddModal}
            onViewAllExpenses={() => setActiveTab('expenses')}
          />
        )}

        {activeTab === 'expenses' && (
          <ExpensesListView
            expenses={expenses}
            currency={currency}
            onOpenAddModal={handleOpenAddModal}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        )}

        {activeTab === 'catalog' && (
          <MasterCatalogView
            catalog={catalog}
            saveCatalogItem={saveCatalogItem}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsView
            expenses={expenses}
            stats={dashboardStats}
            currency={currency}
            userEmail={userProfile?.email || undefined}
          />
        )}

        {activeTab === 'calculator' && (
          <CalculatorView
            currency={currency}
            onAddFromCalculator={handleAddFromCalculator}
          />
        )}

      </main>

      {/* Add / Edit Expense Modal */}
      <ExpenseFormModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingExpense(null);
        }}
        onSave={handleSaveExpense}
        initialExpense={editingExpense}
        catalog={catalog}
        getSuggestionForName={getSuggestionForName}
        saveCatalogItem={saveCatalogItem}
        currency={currency}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Personal Expense Tracker PWA</span>
            <span>• Firestore Real-Time Sync & Local Storage Fallback</span>
          </div>
          <div className="text-slate-500 text-[11px]">
            Needs • Wants • Desires Financial Categorization
          </div>
        </div>
      </footer>

    </div>
  );
}
