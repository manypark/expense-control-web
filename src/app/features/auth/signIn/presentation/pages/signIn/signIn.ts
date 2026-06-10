import { Router, RouterLink } from "@angular/router";
import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, pattern, required } from '@angular/forms/signals';

import { toast, NgxSonnerToaster } from 'ngx-sonner';
import { injectMutation } from "@tanstack/angular-query-experimental";

import { EmailVO, PasswordVO, SignInRequestEntity, SignInUsecase } from '../../../domain';

@Component({
  selector    : 'app-sign-in',
  styleUrl    : './signIn.css',
  templateUrl : './signIn.html',
  imports     : [
    RouterLink,
    FormField,
    FormRoot,
    NgxSonnerToaster,
  ],
})
export default class SignIn {

  private readonly signUsecase = inject( SignInUsecase );
  private readonly router = inject(Router);

  signInModel = signal({
    email   : '',
    password: '',
  });

  readonly signInMutation = injectMutation( () => ({
    mutationFn: (signInEntity:SignInRequestEntity) => this.signUsecase.execute(signInEntity),
    onSuccess : (data) => {

      toast.success(`Inicio de sesión exitoso`, { description: `Bienvenido - ${data.user.email}`});
      
      localStorage.setItem('accesToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userLogued', data.user.email);

      this.router.navigate(['/home']);
    },
    onError   : (error) => {
      toast.error( error.message );
    },
  }));

  signInForm = form(
    this.signInModel, 
    ( schema ) => {
      required( schema.email, { message: 'El correo es requerido.' } );
      email( schema.email, { message: 'Debe de ser un correo valido.' } );

      required( schema.password, { message: 'La contraseña es requerida.' } );
      minLength(schema.password, 6, {message: 'La contraseña debe de tener al menos 6 caracteres.'});
      pattern(schema.password, /[A-Z]/, { message : 'Debe de contener al menos una Mayuscula' });
      pattern(schema.password, /[a-z]/, { message : 'Debe de contener al menos una Minuscula' });
      pattern(schema.password, /[\d]/, { message : 'Debe de contener al menos un Número' });
    },
    { 
      submission: {
        action : async (field) => {

          this.signInMutation.mutate({ 
            email   : EmailVO.create( field().value().email ),
            password: PasswordVO.create( field().value().password )
          });

          return null;
        },
      }

    }
  );
  
}