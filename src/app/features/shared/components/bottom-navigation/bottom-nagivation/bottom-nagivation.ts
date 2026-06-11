import { filter } from 'rxjs';
import { Component } from '@angular/core';
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

      });
  }
}