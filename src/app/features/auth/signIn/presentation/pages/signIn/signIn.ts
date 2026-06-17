import { RouterLink } from "@angular/router";
import { Component, inject } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';

import { SignInService } from "../../services/signInService";
import { CommonInput, CommonButton } from "../../../../../shared/components/inputs";

@Component({
  selector    : 'app-sign-in',
  styleUrl    : './signIn.css',
  templateUrl : './signIn.html',
  imports: [
    FormRoot,
    FormField,
    RouterLink,
    CommonInput,
    CommonButton,
  ],
})
export default class SignIn {
  readonly signInService = inject( SignInService );
}