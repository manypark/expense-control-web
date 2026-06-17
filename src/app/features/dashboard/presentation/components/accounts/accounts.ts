import { DecimalPipe } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';

import ApexCharts from 'apexcharts';

import { AccountsServices } from '../../signals';

@Component({
  selector    : 'app-accounts',
  templateUrl : './accounts.html',
  styleUrl    : './accounts.css',
  imports     : [ DecimalPipe ],
})
export class Accounts {

  readonly accountsServices = inject(AccountsServices);

  constructor() {
    effect( () => {
      if (!this.totalNames().length) return;

      setTimeout( () => {

        const options = {
          series: [
            {
              name: "Total",
              data: this.totalBalances(),
              color: "#8FA9FF",
            }
          ],
          chart: {
            sparkline: {
              enabled: false,
            },
            type: "bar",
            width: "100%",
            height: 400,
            toolbar: {
              show: true,
            }
          },
          fill: {
            opacity: 1,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: "100%",
              borderRadiusApplication: "end",
              borderRadius: 4,
            },
          },
          legend: {
            show: true,
            position: "bottom",
          },
          tooltip: {
            shared: true,
            intersect: false,
            formatter: (value:any) => {
              const formatter = new Intl.NumberFormat('en-US');
              return "$" + formatter.format(value);
            }
          },
          xaxis: {
            labels: {
              show      : true,
              formatter : (value:any) => {
                const formatter = new Intl.NumberFormat('en-US');
                return "$" + formatter.format(value);
              }
            },
            categories: this.totalNames(),
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              show: true,
              style: {
                fontFamily: "Inter, sans-serif",
                cssClass: 'text-xs font-normal fill-body'
              }
            }
          },
          grid: {
            show: true,
            strokeDashArray: 4,
            padding: {
              left: 2,
              right: 6,
              top: -20
            },
          },
        }

        if(document.getElementById("bar-chart") && typeof ApexCharts !== 'undefined') {
          const chart = new ApexCharts(document.getElementById("bar-chart"), options);
          chart.render();
        }
      }, 100);
    });
  }

  readonly totalBalance = computed(() => {
    const accounts = this.accountsServices.accountsQuery.data() ?? [];
    return accounts.reduce( (total, account) => total + account.balance, 0 );
  });

  readonly totalNames = computed( () => {
    const accounts = this.accountsServices.accountsQuery.data() ?? [];
    return accounts?.map( item => item.name );
  });
  readonly totalBalances = computed( () => {
    const accounts = this.accountsServices.accountsQuery.data() ?? [];
    return accounts?.map( item => item.balance );
  });
  
}