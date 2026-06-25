import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
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

export class App  implements AfterViewInit {
  
  protected readonly title = signal('expense-app-web');

  ngAfterViewInit(): void {
    initFlowbite();
  }
}