import { Expense, DashboardStats } from '../types';
import jsPDF from 'jspdf';

export function exportExpensesCSV(expenses: Expense[], currency: string = '$'): void {
  const headers = ['Date', 'Expense Name', 'Amount', 'Financial Category', 'Functional Category', 'Payment Method', 'Notes'];
  
  const rows = expenses.map((e) => [
    `"${e.date}"`,
    `"${e.title.replace(/"/g, '""')}"`,
    e.amount.toFixed(2),
    `"${e.financialCategory}"`,
    `"${e.functionalCategory}"`,
    `"${e.paymentMethod}"`,
    `"${(e.note || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Expense_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportExpensesPDF(
  expenses: Expense[], 
  stats: DashboardStats, 
  currency: string = '$',
  userEmail?: string
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 15;

  // Header Title
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Personal Expense Tracker - Financial Report', 14, 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  const dateStr = new Date().toLocaleDateString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  doc.text(`Generated on: ${dateStr} ${userEmail ? `| Account: ${userEmail}` : ''}`, 14, 22);

  y = 36;

  // Executive Summary Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, pageWidth - 28, 38, 3, 3, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Executive Summary', 20, y + 8);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Today Spending: ${currency}${stats.todayTotal.toFixed(2)}`, 20, y + 16);
  doc.text(`Weekly Spending: ${currency}${stats.weeklyTotal.toFixed(2)}`, 20, y + 23);
  doc.text(`Monthly Spending: ${currency}${stats.monthlyTotal.toFixed(2)}`, 20, y + 30);

  doc.text(`Yearly Total: ${currency}${stats.yearlyTotal.toFixed(2)}`, 110, y + 16);
  doc.text(`Daily Average: ${currency}${stats.avgDailyExpense.toFixed(2)}/day`, 110, y + 23);
  doc.text(`Total Recorded Expenses: ${stats.totalCount} items`, 110, y + 30);

  y += 46;

  // Financial Breakdown (Needs vs Wants vs Desires)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Financial Categorization (Needs vs Wants vs Desires)', 14, y);

  y += 5;
  const grandFinTotal = Math.max(
    1,
    stats.financialBreakdown.Need +
      stats.financialBreakdown.Want +
      stats.financialBreakdown.Desire +
      stats.financialBreakdown.Miscellaneous
  );

  const finCategories = [
    { name: 'Need', amt: stats.financialBreakdown.Need },
    { name: 'Want', amt: stats.financialBreakdown.Want },
    { name: 'Desire', amt: stats.financialBreakdown.Desire },
    { name: 'Miscellaneous', amt: stats.financialBreakdown.Miscellaneous },
  ];

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  finCategories.forEach((fc) => {
    const pct = ((fc.amt / grandFinTotal) * 100).toFixed(1);
    doc.text(`• ${fc.name}: ${currency}${fc.amt.toFixed(2)} (${pct}%)`, 20, y + 5);
    y += 6;
  });

  y += 6;

  // Expenses Table Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Expense Transactions Log', 14, y);
  y += 6;

  // Table Column Headers
  doc.setFillColor(226, 232, 240);
  doc.rect(14, y, pageWidth - 28, 7, 'F');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  doc.text('Date', 16, y + 5);
  doc.text('Expense Name', 40, y + 5);
  doc.text('Financial', 95, y + 5);
  doc.text('Functional', 125, y + 5);
  doc.text('Payment', 155, y + 5);
  doc.text('Amount', pageWidth - 20, y + 5, { align: 'right' });

  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);

  // Table rows
  const maxRows = Math.min(expenses.length, 30); // Up to 30 items for first page
  for (let i = 0; i < maxRows; i++) {
    const item = expenses[i];
    
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.text(item.date, 16, y);
    doc.text(item.title.substring(0, 26), 40, y);
    doc.text(item.financialCategory, 95, y);
    doc.text(item.functionalCategory, 125, y);
    doc.text(item.paymentMethod, 155, y);
    doc.text(`${currency}${item.amount.toFixed(2)}`, pageWidth - 20, y, { align: 'right' });

    y += 6;
    doc.setDrawColor(241, 245, 249);
    doc.line(14, y - 4, pageWidth - 14, y - 4);
  }

  // Footer page number
  const totalPages = (doc as any).internal?.pages?.length ? (doc as any).internal.pages.length - 1 : 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Page ${i} of ${totalPages} - Generated by Personal Expense Tracker PWA`, pageWidth / 2, 290, { align: 'center' });
  }

  doc.save(`Expense_Summary_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
}
