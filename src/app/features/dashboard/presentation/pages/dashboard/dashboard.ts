import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

import { Accounts, Cards, ExpenseMonthly } from '../../components';
import { AccountsServices } from '../../signals';

@Component({
  selector    : 'app-dashboard',
  templateUrl : './dashboard.html',
  styleUrl    : './dashboard.css',
  imports: [
    Cards,
    Accounts,
    DecimalPipe,
    ExpenseMonthly,
  ],
})
export default class Dashboard {
  readonly recentTransactions = [
    {
      merchant: 'Whole Foods Market',
      account: 'Cuenta digital • 4821',
      category: 'Alimentos',
      date: '24 Oct 2023',
      amount: -245.80,
      icon: 'cart',
      badgeClass: 'bg-blue-50 text-blue-700',
    },
    {
      merchant: 'Uber Trip',
      account: 'Amex Gold • 1002',
      category: 'Transporte',
      date: '23 Oct 2023',
      amount: -42.00,
      icon: 'car',
      badgeClass: 'bg-blue-50 text-blue-700',
    },
    {
      merchant: 'Salary Deposit',
      account: 'Cuenta digital • 4821',
      category: 'Ingreso',
      date: '20 Oct 2023',
      amount: 8450.00,
      icon: 'cash',
      badgeClass: 'bg-emerald-50 text-emerald-700',
    },
    {
      merchant: 'CVS Pharmacy',
      account: 'Visa Infinite • 9918',
      category: 'Salud',
      date: '19 Oct 2023',
      amount: -12.40,
      icon: 'bag',
      badgeClass: 'bg-blue-50 text-blue-700',
    },
    {
      merchant: 'Netflix Subscription',
      account: 'Amex Gold • 1002',
      category: 'Entretenimiento',
      date: '18 Oct 2023',
      amount: -19.99,
      icon: 'calendar',
      badgeClass: 'bg-blue-50 text-blue-700',
    },
  ];

  readonly categories = [
    { label: 'Alimentos', value: 40, color: 'bg-blue-700' },
    { label: 'Servicios', value: 25, color: 'bg-blue-400' },
    { label: 'Otros', value: 35, color: 'bg-gray-300' },
  ];

  readonly expensesByCard = [
    { card: 'Amex Gold', amount: 1245, progress: 64 },
    { card: 'Visa Infinite', amount: 842.10, progress: 44 },
  ];

  constructor(readonly accountsServices: AccountsServices) {}
}
