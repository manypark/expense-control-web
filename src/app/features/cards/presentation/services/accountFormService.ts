import { inject, Service, signal } from "@angular/core";
import { form, required } from "@angular/forms/signals";

import { CreateUpdateServices } from "./accountsServices";
import { AccountsEntity } from "../../../dashboard/domain/entities";
import { CreateAccountEntity, UpdtaeAccountEntity } from "../../domain/entities";

@Service()
export class AccountFormService {

    private readonly editingAccountId = signal<string | null>(null);
    private readonly createAccountService = inject( CreateUpdateServices );
    onAccountSaved?: () => void;

    readonly accountModel = signal<CreateAccountEntity>({
        name   : '',
        code   : '',
        balance: 0,
    });

    readonly accountForm = form(
        this.accountModel,
        (schema) => {
            required(schema.name, { message: 'El nombre es requerido.' });
            required(schema.code, { message: 'El code / id es requerido.' });
            required(schema.balance, { message: 'El balance inicial es requerido.' });
        },
        {
            submission: {
                action: async () => {
                    this.isEditing() ? this.updateAccountServices() : this.createAccountServices();
                    this.onAccountSaved?.();
                    this.resetForm();
                    return null;
                },
            },
        }
    );

    createAccountServices() {
        const createAccount:CreateAccountEntity = {
            code    : this.accountModel().code,
            name    : this.accountModel().name,
            balance : this.accountModel().balance,
        };

        this.createAccountService.createAccountMutation.mutate( createAccount );
    }

    updateAccountServices() {
        const updateAccount:UpdtaeAccountEntity  = {
            code    : this.accountModel().code,
            name    : this.accountModel().name,
            balance : this.accountModel().balance,
            id      : this.editingAccountId() ?? '',
        };

        this.createAccountService.updateAccountMutation.mutate( updateAccount );
    }

    setAccountToEdit( account : AccountsEntity ) {
        this.editingAccountId.set(account.id);
        this.accountModel.set({
            name   : account.name,
            code   : account.code,
            balance: account.balance,
        });
    }

    resetForm() {
        this.accountForm().reset();
        this.accountModel.set({
            name   : '',
            code   : '',
            balance: 0,
        });
        this.editingAccountId.set(null);
    }

    isEditing() {
        return this.editingAccountId() !== null;
    }
}