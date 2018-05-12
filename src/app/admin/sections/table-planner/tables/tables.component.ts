import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
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

}
