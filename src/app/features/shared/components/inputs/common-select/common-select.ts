import { Component, input, output } from '@angular/core';

export interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector    : 'app-common-select',
  templateUrl : './common-select.html',
  styleUrl    : './common-select.css',
  imports     : [],
})
export class CommonSelect {

  title = input.required<string>();

  classTitle = input.required<string>();

  gap = input.required<string>();

  placeholder = input<string>('Selecciona una opción');

  id = input<string>('select');

  options = input.required<SelectOption[]>();

  value = input<string>('');

  disabled = input<boolean>(false);

  valueChange = output<string>();

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.valueChange.emit(value);
  }
  
}
