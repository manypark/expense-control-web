import { filter } from 'rxjs';
import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector    : 'app-bottom-nagivation',
  templateUrl : './bottom-nagivation.html',
  styleUrl    : './bottom-nagivation.css',
  imports     : [
    RouterLink,
    RouterOutlet,
  ],
})

export default class BottomNagivation {
  selectedIndex = 0;
  isMenuOpen = signal(false);

  navItems = [
    {
      label: 'Inicio',
      route: '/home/dashboard',
      icon: 'm4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5'
    },
    {
      label: 'Gastos',
      route: '/home/expenses',
      icon: 'M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z'
    },
    {
      label: 'Servicios',
      route: '/home/services',
      icon: 'M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z'
    },
    {
      label: 'Analítica',
      route: '/home/analitycs',
      icon: 'M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5'
    },
    {
      label: 'Tarjetas',
      route: '/home/cards',
      icon: 'M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z'
    },
  ];

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        const url = this.router.url;

        if (url.includes('dashboard')) {
          this.selectedIndex = 0;
        } else if (url.includes('expenses')) {
          this.selectedIndex = 1;
        } else if (url.includes('services')) {
          this.selectedIndex = 2;
        } else if (url.includes('analitycs')) {
          this.selectedIndex = 3;
        } else if (url.includes('cards')) {
          this.selectedIndex = 4;
        }

        this.isMenuOpen.set(false);
      });
  }

  toggleMenu() {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
