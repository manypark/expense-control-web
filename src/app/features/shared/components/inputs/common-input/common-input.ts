import { Component, input } from '@angular/core';
import { Field, FormField } from "@angular/forms/signals";

@Component({
  selector    : 'app-common-input',
  templateUrl : './common-input.html',
  styleUrl    : './common-input.css',
  imports     : [
    FormField,
  ],
})
export class CommonInput {
  type = input<string>('text');
  id = input.required<string>();
  placeholder = input<string>('');
  label = input.required<string>();
  autocomplete = input<string>('off');
  formField = input.required<Field<any, string | number>>();
}