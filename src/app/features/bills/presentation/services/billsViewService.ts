import { Service } from "@angular/core";

import { BillEntity } from "../../domain";

@Service()
export class BillsViewService {

    getDueLabel(bill: BillEntity): string {
        if (bill.isPaid) {
            return `Pagado el ${this.formatShortDate(bill.updatedAt)}`;
        }

        const days = this.getDaysUntilDueDate(bill.dueDate);

        if (days < 0) {
            return `Venció hace ${Math.abs(days)} día${Math.abs(days) === 1 ? '' : 's'}`;
        }

        if (days === 0) {
            return 'Vence hoy';
        }

        if (days <= 7) {
            return `Vence en ${days} día${days === 1 ? '' : 's'}`;
        }

        return this.formatLongDate(bill.dueDate);
    }

    getDueBadgeClasses(bill: BillEntity): string {
        if (bill.isPaid) {
            return 'bg-green-100 text-green-700';
        }

        const days = this.getDaysUntilDueDate(bill.dueDate);

        if (days <= 2) {
            return 'bg-red-100 text-red-700';
        }

        if (days <= 7) {
            return 'bg-blue-100 text-blue-700';
        }

        return 'bg-gray-200 text-gray-600';
    }

    getIconPath(title: string): string {
        const normalizedTitle = title.toLowerCase();

        if (normalizedTitle.includes('spotify') || normalizedTitle.includes('music')) {
            return 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z';
        }

        if (normalizedTitle.includes('cloud') || normalizedTitle.includes('aws')) {
            return 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z';
        }

        if (normalizedTitle.includes('gym') || normalizedTitle.includes('fit')) {
            return 'm6.5 6.5 11 11M21 21l-3.5-3.5M3 3l3.5 3.5M18 5l1 1M5 18l1 1M9 4l11 11M4 9l11 11';
        }

        if (normalizedTitle.includes('adobe') || normalizedTitle.includes('creative')) {
            return 'M15.232 5.232a3 3 0 0 1 4.243 4.243L8.5 20.45 3 21l.55-5.5L14.525 4.525a3 3 0 0 1 .707.707Z';
        }

        if (normalizedTitle.includes('netflix') || normalizedTitle.includes('hbo') || normalizedTitle.includes('video')) {
            return 'M4 7h16v10H4V7Zm4 13h8M8 4h8';
        }

        return 'M7 4h10a2 2 0 0 1 2 2v13H5V6a2 2 0 0 1 2-2Zm3 0v4h4V4';
    }

    private getDaysUntilDueDate(dueDate: Date): number {
        const today = this.getLocalDateStart(new Date());
        const due = this.getLocalDateStart(dueDate);
        const millisecondsPerDay = 1000 * 60 * 60 * 24;

        return Math.round((due.getTime() - today.getTime()) / millisecondsPerDay);
    }

    private getLocalDateStart(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    private formatShortDate(date: Date): string {
        return new Intl.DateTimeFormat('es-MX', {
            day: '2-digit',
            month: '2-digit',
        }).format(date);
    }

    private formatLongDate(date: Date): string {
        return new Intl.DateTimeFormat('es-MX', {
            day: '2-digit',
            month: 'long',
        }).format(date);
    }
}
