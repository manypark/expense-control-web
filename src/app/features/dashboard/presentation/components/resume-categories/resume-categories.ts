import { DecimalPipe } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, OnDestroy, viewChild } from '@angular/core';

import ApexCharts from 'apexcharts';

import { ExpenseMonthlyServices } from '../../signals';

@Component({
  selector    : 'app-resume-categories',
  templateUrl : './resume-categories.html',
  styleUrl    : './resume-categories.css',
  imports     : [
    DecimalPipe,
  ],
})
export class ResumeCategories implements OnDestroy {

  readonly expenseMonthlyServices = inject( ExpenseMonthlyServices );
  readonly categoriesChart = viewChild<ElementRef<HTMLDivElement>>( 'categoriesChart' );

  private chart?: ApexCharts;

  private readonly categoryCatalog = [
    { label: 'Alimentos', color: '#1d4ed8' },
    { label: 'Salud', color: '#2563eb' },
    { label: 'Compras', color: '#3b82f6' },
    { label: 'Entretenimiento', color: '#60a5fa' },
    { label: 'Servicios', color: '#93c5fd' },
    { label: 'Otros', color: '#64748b' },
    { label: 'Educacion', color: '#94a3b8' },
    { label: 'Transporte', color: '#cbd5e1' },
    { label: 'Viajes', color: '#d1d5db' },
  ];

  private readonly cardCatalog = [
    'INVEX digital',
    'INVEX fisica',
    'Nu digital',
    'BBVA digital',
    'BBVA fisica',
  ];

  readonly totalExpenses = computed(() => this.expenses.reduce(
    (total, expense) => total + this.validAmount( expense.amount ),
    0,
  ));

  readonly categories = computed(() => {
    const amounts = new Map(
      this.categoryCatalog.map( category => [ this.normalize( category.label ), 0 ]),
    );
    const otherKey = this.normalize( 'Otros' );

    for (const expense of this.expenses) {
      const categoryKey = this.normalize( expense.category );
      const targetKey = amounts.has( categoryKey ) ? categoryKey : otherKey;
      amounts.set( targetKey, (amounts.get( targetKey ) ?? 0) + this.validAmount( expense.amount ) );
    }

    const total = this.totalExpenses();

    return this.categoryCatalog.map( category => {
      const amount = amounts.get( this.normalize( category.label ) ) ?? 0;

      return {
        ...category,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
      };
    });
  });

  readonly expensesByCard = computed(() => {
    const amounts = new Map<string, { card: string; amount: number }>();

    for (const card of this.cardCatalog) {
      amounts.set( this.normalize( card ), { card, amount: 0 } );
    }
    amounts.set( 'contado', { card: 'Contado', amount: 0 } );

    for (const expense of this.expenses) {
      const cardName = expense.creditCardId && expense.creditCard?.alias
        ? expense.creditCard.alias
        : 'Contado';
      const key = this.normalize( cardName );
      const current = amounts.get( key ) ?? { card: cardName, amount: 0 };

      amounts.set( key, {
        ...current,
        amount: current.amount + this.validAmount( expense.amount ),
      });
    }

    const cards = [ ...amounts.values() ].filter( card => card.amount > 0 );
    const highestAmount = Math.max( ...cards.map( card => card.amount ), 0 );

    return cards.map( card => ({
      ...card,
      progress: highestAmount > 0 ? (card.amount / highestAmount) * 100 : 0,
    }));
  });

  constructor() {
    effect(() => {
      const element = this.categoriesChart()?.nativeElement;
      const categories = this.categories().filter( category => category.amount > 0 );

      if (!element || categories.length === 0) {
        this.chart?.destroy();
        this.chart = undefined;
        return;
      }

      setTimeout(() => this.renderChart( element ));
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private get expenses() {
    return this.expenseMonthlyServices.expensesQuery.data() ?? [];
  }

  private validAmount(value: number): number {
    const amount = Number( value );
    return Number.isFinite( amount ) ? Math.abs( amount ) : 0;
  }

  private normalize(value: string): string {
    return value
      .normalize( 'NFD' )
      .replace( /[\u0300-\u036f]/g, '' )
      .trim()
      .toLocaleLowerCase( 'es-MX' );
  }

  private renderChart(element: HTMLDivElement): void {
    const categories = this.categories().filter( category => category.amount > 0 );
    const options = {
      chart: {
        type: 'donut',
        width: 180,
        height: 180,
        fontFamily: 'Inter, sans-serif',
        sparkline: {
          enabled: true,
        },
      },
      series: categories.map( category => category.amount ),
      labels: categories.map( category => category.label ),
      colors: categories.map( category => category.color ),
      stroke: {
        width: 0,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      tooltip: {
        y: {
          formatter: (value: number) => {
            const percentage = this.totalExpenses() > 0
              ? (value / this.totalExpenses()) * 100
              : 0;
            return `${this.formatCurrency( value )} (${percentage.toFixed( 1 )}%)`;
          },
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '74%',
            labels: {
              show: true,
              name: {
                show: true,
                offsetY: 18,
                formatter: () => 'Total',
              },
              value: {
                show: false,
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                fontSize: '12px',
                fontWeight: 400,
                color: '#6b7280',
                formatter: () => this.formatCurrency( this.totalExpenses() ),
              },
            },
          },
        },
      },
    };

    if (this.chart) {
      this.chart.updateOptions( options, true, true );
      return;
    }

    this.chart = new ApexCharts( element, options );
    this.chart.render();
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat( 'es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format( value );
  }
}
