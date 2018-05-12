import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Guest } from '../../../../shared/models';
import { DataService } from '../../../../shared/services/data.service';
import { BaseSectionComponent } from '../../base-section/base-section.component';

@Component({
  selector: 'app-table-guests',
  templateUrl: './table-guests.component.html',
  styleUrls: ['./table-guests.component.less']
})
export class TableGuestsComponent extends BaseSectionComponent implements OnInit {

  @Input() refresh: Subject<boolean>;
  @Output() refreshed: EventEmitter<boolean> = new EventEmitter<boolean>();

  public modelName: string = 'table-guest';

  constructor(
    private dataService: DataService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.storeSubscription(this.refresh.subscribe(res => this.refreshResult()));
  }

  afterTableConfig() {
    this.tableConfig.other_actions[0].click = this.assignTable.bind(this);
    this.storeSubscription(this.adminService.getGroupNames().subscribe(res => {
      this.tableConfig.selects.find(s => s.label === 'Grupo').options = res;
    }));
  }

  assignTable(guest: Guest) {
    this.selectedElement = guest;
    this.util.showModal(`rsvp-${this.modelName}-modal`);
  }

  afterModalFinish() {
    this.refreshed.emit(true);
  }

}
