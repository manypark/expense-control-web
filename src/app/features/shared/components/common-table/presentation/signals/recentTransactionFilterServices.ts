import { computed, inject, Service, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { RecentExpensesFilterEntity } from '../../domain';
import { RecentTransactionFilterUsecase } from '../../domain/usecase';
import { RecentTransactionEntity } from '../../../../entities';

@Service()
export class RecentTransactionsFilterServices {

    private readonly limit = signal(10);
    private readonly currentPage = signal(0);
    private readonly loadedPages = signal<Record<number, RecentTransactionEntity[]>>({});
    private readonly totalItems = signal(0);
    private readonly totalAmountFromApi = signal<number | null>(null);
    private readonly from = signal<string | null>(null);
    private readonly to = signal<string | null>(null);
    private readonly category = signal<string | null>(null);
    private readonly recentTransactionFilterUsecase = inject( RecentTransactionFilterUsecase );

    readonly offsetComputed = computed( () => this.currentPage() * this.limit() );
    readonly currentPageComputed = computed( () => this.currentPage() + 1 );
    readonly totalComputed = computed( () => this.totalItems() );
    readonly fromComputed = computed( () => this.from() );
    readonly toComputed = computed( () => this.to() );
    readonly categoryComputed = computed( () => this.category() );
    readonly totalPagesComputed = computed( () => Math.max(Math.ceil(this.totalItems() / this.limit()), 1) );
    readonly currentItems = computed( () => {
        return this.loadedPages()[this.currentPage()] ?? this.recentTransactionFilterQuery.data()?.items ?? [];
    });
    readonly totalExpensesAmountComputed = computed( () => {
        const totalAmountFromApi = this.totalAmountFromApi();

        if (typeof totalAmountFromApi === 'number') {
            return totalAmountFromApi;
        }

        const loadedExpenses = Object.values(this.loadedPages()).flat();
        return loadedExpenses.reduce((total, expense) => total + Number(expense.amount), 0);
    });
    readonly loadedItemsComputed = computed( () => {
        return Object.values(this.loadedPages()).reduce((total, items) => total + items.length, 0);
    });
    readonly fromItemComputed = computed( () => {
        if (this.totalItems() === 0 || this.currentItems().length === 0) { return 0; }
        return this.offsetComputed() + 1;
    });
    readonly toItemComputed = computed( () => {
        if (this.totalItems() === 0 || this.currentItems().length === 0) { return 0; }
        return this.offsetComputed() + this.currentItems().length;
    });
    readonly canGoPrevious = computed( () => this.currentPage() > 0 );
    readonly canGoNext = computed( () => this.toItemComputed() < this.totalItems() );

    public recentTransactionFilterQuery = injectQuery(() => ({
        queryKey: ['get-recent-filter-transaction', this.limit(), this.offsetComputed(), this.from(), this.to(), this.category()],
        queryFn : async () => {
            const cachedItems = this.loadedPages()[this.currentPage()];

            if (cachedItems) {
                return this.buildCachedResponse(cachedItems);
            }

            const response = await this.recentTransactionFilterUsecase.execute({
                limit : this.limit(),
                offset: this.offsetComputed(),
                from  : this.from(),
                to    : this.to(),
                category: this.category(),
            });

            this.totalItems.set(response.total);
            this.totalAmountFromApi.set(response.totalAmount ?? null);
            this.loadedPages.update((pages) => ({
                ...pages,
                [this.currentPage()]: response.items,
            }));

            return response;
        },
    }));

    public previousPage() {
        if (!this.canGoPrevious()) { return; }
        this.currentPage.update((page) => page - 1);
    }

    public nextPage() {
        if (!this.canGoNext()) { return; }
        this.currentPage.update((page) => page + 1);
    }

    public updateOffset( offset:number ) {
        this.currentPage.set(Math.floor(offset / this.limit()));
    }

    public applyFilter(from: string | null, to: string | null, category: string | null) {
        this.from.set(from);
        this.to.set(to);
        this.category.set(category);
        this.resetPagination();
    }

    public resetPagination() {
        this.currentPage.set(0);
        this.loadedPages.set({});
        this.totalItems.set(0);
        this.totalAmountFromApi.set(null);
    }

    private buildCachedResponse(items: RecentTransactionEntity[]): RecentExpensesFilterEntity {
        return {
            items,
            total  : this.totalItems(),
            limit  : this.limit(),
            offset : this.offsetComputed(),
            hasMore: this.offsetComputed() + items.length < this.totalItems(),
            totalAmount: this.totalAmountFromApi() ?? undefined,
        };
    }
}
