import { Component, input } from '@angular/core';

@Component({
  selector    : 'app-common-button',
  templateUrl : './common-button.html',
  styleUrl    : './common-button.css',
  imports     : [
    
  ],
})

export class CommonButton {
  text = input.required<string>();
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  loadingText = input<string>('Cargando...');
  type = input<'button' | 'submit' | 'reset'>('button');
}