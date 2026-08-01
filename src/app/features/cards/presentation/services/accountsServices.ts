import { inject, Service } from '@angular/core';

import { toast } from 'ngx-sonner';
import { injectMutation } from '@tanstack/angular-query-experimental';

import { AccountsServices } from '../../../dashboard/presentation/signals';
import { CreateAccountEntity, CreateAccountUsecase, UpdateAccountUsecase, UpdtaeAccountEntity } from '../../domain';

@Service()
export class CreateUpdateServices {
    // ************* || services || *************
    readonly accountServices = inject(AccountsServices);

    // ************* || usecase || *************
    private readonly createAccountUsecase = inject( CreateAccountUsecase );
    private readonly updateAccountUsecase = inject( UpdateAccountUsecase );

    // ************* || mutacions || *************
    readonly createAccountMutation = injectMutation( () => ({
        mutationFn: ( account : CreateAccountEntity ) => this.createAccountUsecase.execute( account ),
        onSuccess : (data) => {
            toast.success(`Cuenta creada exitosamente`, { description: `Cuenta nueva - ${data.name}`});
            this.accountServices.accountsQuery.refetch();
        },
        onError   : (error) => { toast.error( error.message ); },
    }));

    readonly updateAccountMutation = injectMutation( () => ({
        mutationFn: ( account : UpdtaeAccountEntity ) => this.updateAccountUsecase.execute( account ),
        onSuccess : (data) => {
            toast.success(`Cuenta actualizada exitosamente`, { description: `Cuenta actualizada - ${data.name}`});
            this.accountServices.accountsQuery.refetch();
        },
        onError   : (error) => { toast.error( error.message ); },
    }));
}