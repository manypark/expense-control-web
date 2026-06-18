import { Component, computed, effect, ElementRef, inject, OnDestroy, viewChild } from '@angular/core';

import ApexCharts from 'apexcharts';

import { ExpenseMonthlyServices } from '../../signals/expenseMonthlyServices';

interface MonthlyExpense {
  key: string;
  label: string;
  amount: number;
}

@Component({
  selector    : 'app-expense-monthly',
  templateUrl : './expense-monthly.html',
  styleUrl    : './expense-monthly.css',
  imports     : [],
})
export class ExpenseMonthly implements OnDestroy {

  readonly expenseMonthlyServices = inject( ExpenseMonthlyServices );
  readonly monthlyChart = viewChild<ElementRef<HTMLDivElement>>( 'monthlyChart' );

  private chart?: ApexCharts;

  readonly monthlyExpenses = computed<MonthlyExpense[]>(() => {
    const expenses = this.expenseMonthlyServices.expensesQuery.data() ?? [];
    const monthlyTotals = new Map<string, MonthlyExpense>();

    for (const expense of expenses) {
      const amount = Number( expense.amount );
      if (!Number.isFinite( amount )) continue;

      const expenseDate = this.getExpenseDate( expense.incurredAt );
      const year = expenseDate?.getUTCFullYear() ?? expense.statementYear;
      const month = expenseDate ? expenseDate.getUTCMonth() + 1 : expense.statementMonth;
      const monthIndex = Math.max( month - 1, 0 );
      const key = `${year}-${month}`;
      const label = this.monthLabel( monthIndex );
      const currentMonth = monthlyTotals.get( key ) ?? { key, label, amount: 0 };

      monthlyTotals.set( key, {
        ...currentMonth,
        amount: currentMonth.amount + amount,
      });
    }

    return [ ...monthlyTotals.entries() ]
      .sort( ([currentKey], [nextKey]) => this.sortKey( currentKey ) - this.sortKey( nextKey ) )
      .map( ([, value]) => value );
  });

  constructor() {
    effect(() => {
      const element = this.monthlyChart()?.nativeElement;
      const expenses = this.monthlyExpenses();

      if (expenses.length === 0) {
        this.chart?.destroy();
        this.chart = undefined;
        return;
      }

      if (!element) return;

      setTimeout(() => this.renderChart( element, expenses ));
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private renderChart(element: HTMLDivElement, expenses: MonthlyExpense[]): void {
    const options = this.getChartOptions( expenses );

    if (this.chart) {
      this.chart.updateOptions( options, true, true );
      return;
    }

    this.chart = new ApexCharts( element, options );
    this.chart.render();
  }

  private getChartOptions(expenses: MonthlyExpense[]) {
    return {
      chart: {
        height: 300,
        maxWidth: '100%',
        type: 'area',
        fontFamily: 'Inter, sans-serif',
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
        y: {
          formatter: (value: number) => this.formatCurrency( value ),
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (value: number) => this.formatCurrency( value ),
        offsetY: -10,
        style: {
          fontSize: '15px',
          fontWeight: 700,
        },
        background: {
          enabled: true,
          borderRadius: 3,
          padding: 12,
          borderWidth: 1,
          borderColor: '#e5e7eb',
        },
      },
      stroke: {
        width: 5,
        curve: 'smooth',
        colors: [ '#1d4ed8' ],
      },
      markers: {
        size: 5,
        strokeWidth: 3,
        strokeColors: '#ffffff',
        colors: [ '#1d4ed8' ],
        hover: {
          size: 8,
        },
      },
      grid: {
        show: true,
        borderColor: '#e5e7eb',
        strokeDashArray: 4,
        padding: {
          left: 12,
          right: 18,
          top: 24,
        },
      },
      series: [
        {
          name: 'Gastos',
          data: expenses.map( expense => expense.amount ),
          color: '#1d4ed8',
        },
      ],
      xaxis: {
        categories: expenses.map( expense => expense.label ),
        labels: {
          show: true,
          style: {
            fontFamily: 'Inter, sans-serif',
            cssClass: 'text-xs font-normal fill-gray-500',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          formatter: (value: number) => this.formatCurrency( value ),
          style: {
            fontFamily: 'Inter, sans-serif',
            cssClass: 'text-xs font-normal fill-gray-500',
          },
        },
      },
    };
  }

  private monthLabel(monthIndex: number): string {
    const months = [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ];
    return months[monthIndex] ?? 'Mes';
  }

  private getExpenseDate(incurredAt: string): Date | null {
    const date = new Date( incurredAt );

    return Number.isNaN( date.getTime() ) ? null : date;
  }

  private sortKey(key: string): number {
    const [ year, month ] = key.split( '-' ).map( Number );
    return (year * 100) + month;
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat( 'es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format( value );
  }
}
