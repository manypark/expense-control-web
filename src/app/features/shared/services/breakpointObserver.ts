import { computed, Service, signal } from '@angular/core';

@Service()
export class BreakpointObserverServices {

    private isMobileBreakpoint = signal(true);
    public isMobileBreakpointComputed = computed( () => {
        return this.isMobileBreakpoint();
    });

    public setValueBreakpoint( value:boolean ) {
        this.isMobileBreakpoint.set( value  );
    }

    public toggleValueBreakpoint() {
        this.isMobileBreakpoint.update((isOpen) => !isOpen);
    }
}
