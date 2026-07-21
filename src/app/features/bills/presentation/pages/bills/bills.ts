import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BillsActionsService, BillsModalService, BillsQueryService, BillsSummaryService, BillsViewService } from '../../services';

@Component({
  selector    : 'app-bills',
  templateUrl : './bills.html',
  styleUrl    : './bills.css',
  imports     : [DecimalPipe],
})

export default class Bills {
  readonly billsQueryService = inject( BillsQueryService );
  readonly billsActionsService = inject( BillsActionsService );
  readonly billsModalService = inject( BillsModalService );
  readonly billsSummaryService = inject( BillsSummaryService );
  readonly billsViewService = inject( BillsViewService );
}
