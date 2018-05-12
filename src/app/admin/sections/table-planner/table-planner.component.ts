import { Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TablesResult } from '../../admin-core';

@Component({
  selector: 'app-table-planner',
  templateUrl: './table-planner.component.html',
  styleUrls: ['./table-planner.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TablePlannerComponent {

  public protocolMode: boolean;
  public tablesResult: TablesResult;
  public refreshTables: Subject<boolean> = new Subject();
  public refreshGuests: Subject<boolean> = new Subject();

  onTablesResultChanges(tablesResult: TablesResult) {
    this.tablesResult = tablesResult;
  }

  print(): void {
    window.print();
  }

  tablesResfreshed() {
    this.refreshGuests.next(true);
  }

  guestsRefreshed() {
    this.refreshTables.next(true);
  }

}
