import { inject, Service } from '@angular/core';

import { toast } from 'ngx-sonner';
import { injectMutation } from '@tanstack/angular-query-experimental';

import { CreateAccountEntity, CreateAccountUsecase } from '../../domain';

@Service()
export class AccountsServices {

    // ************* || usecase || *************
    private readonly createAccountUsecase = inject( CreateAccountUsecase );

    // ************* || mutacion || *************
    readonly createAccountMutation = injectMutation( () => ({
        mutationFn: ( account : CreateAccountEntity ) => this.createAccountUsecase.execute( account ),
        onSuccess : (data) => {
            toast.success(`Cuenta creada exitosamente`, { description: `Cuenta nueva - ${data.name}`});
        },
        onError   : (error) => { toast.error( error.message ); },
    }));
}