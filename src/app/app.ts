import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { initFlowbite } from 'flowbite';
import { NgxSonnerToaster } from "ngx-sonner";

@Component({
  selector    : 'app-root',
  templateUrl : './app.html',
  imports: [
    RouterOutlet,
    NgxSonnerToaster
],
})

export class App  implements OnInit {
  
  protected readonly title = signal('expense-app-web');

  ngOnInit(): void {
    initFlowbite();
  }
}