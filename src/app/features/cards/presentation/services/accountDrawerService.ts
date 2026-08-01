import { Service, signal } from "@angular/core";
import { Drawer } from "flowbite";

import { AccountsEntity } from "../../../dashboard/domain/entities";
import { AccountFormService } from "./accountFormService";

@Service()
export class AccountDrawerService {

    readonly isOpen = signal(false);

    private drawer?: Drawer;
    private accountFormService?: AccountFormService;

    connectForm(accountFormService: AccountFormService) {
        this.accountFormService = accountFormService;
        this.accountFormService.onAccountSaved = () => this.close(false);
    }

    openCreate() {
        this.accountFormService?.resetForm();
        this.open();
    }

    openEdit(account: AccountsEntity) {
        this.accountFormService?.setAccountToEdit(account);
        this.open();
    }

    close(resetForm = true) {
        this.drawer?.hide();
        this.drawer = undefined;
        this.isOpen.set(false);

        if (resetForm) {
            this.accountFormService?.resetForm();
        }
    }

    private open() {
        this.isOpen.set(true);

        setTimeout(() => {
            this.initializeDrawer();
            this.drawer?.show();
        });
    }

    private initializeDrawer() {
        const target = document.getElementById('account-drawer');

        if (!target) { return; }

        this.drawer = new Drawer(target);
    }
}
