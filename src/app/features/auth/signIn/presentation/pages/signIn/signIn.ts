import { RouterLink } from "@angular/router";
import { Component, inject } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';

import { SignInService } from "../../services/signInService";

@Component({
  selector    : 'app-sign-in',
  styleUrl    : './signIn.css',
  templateUrl : './signIn.html',
  imports     : [
    FormRoot,
    FormField,
    RouterLink,
  ],
})
export default class SignIn {
  readonly signInService = inject( SignInService );
}