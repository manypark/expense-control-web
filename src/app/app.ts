import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { initFlowbite } from 'flowbite';

@Component({
  selector    : 'app-root',
  templateUrl : './app.html',
  imports     : [ 
    RouterOutlet,
  ],
})

export class App  implements OnInit {
  
  protected readonly title = signal('expense-app-web');

  ngOnInit(): void {
    initFlowbite();
  }
}