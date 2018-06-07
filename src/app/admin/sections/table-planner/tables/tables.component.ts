import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Table } from '../../../../shared/models';
import { Result } from '../../../admin-core';
import { BaseSectionComponent } from '../../base-section/base-section.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.less']
})
export class TablesComponent extends BaseSectionComponent implements OnInit {

  public modelName: string = 'table';

  @Input() tableFilter: any;
  @Input() refresh: Subject<boolean>;
  @Output() tablesResultChanges: EventEmitter<Result> = new EventEmitter<Result>();
  @Output() showProtocol: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshed: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    super.ngOnInit();
    this.storeSubscription(this.refresh.subscribe(res => this.refreshResult()));
  }

  afterTableConfig() {
    this.tableConfig.top_actions[0].click = this.onShowProtocol.bind(this);
    this.tableConfig.other_actions[0].click = this.viewStreetSign.bind(this);
    this.tableConfig.other_actions[1].click = this.editElement.bind(this);
    this.tableConfig.other_actions[2].click = this.removeElement.bind(this);
  }

  afterRefreshResult() {
    this.tablesResultChanges.emit(this.result);
  }

  afterModalFinish() {
    this.refreshed.emit(true);
  }

  onShowProtocol() {
    this.showProtocol.emit(true);
  }

  viewStreetSign(table: Table) {
    window.open('admin/table/street/' + table._id);
  }

}
