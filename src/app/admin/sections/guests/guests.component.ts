import { Component, Injector, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { BaseSectionComponent } from '../base-section/base-section.component';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.less']
})
export class GuestsComponent extends BaseSectionComponent implements OnInit {

  public modelName = 'guest';

  constructor(
    private dataService: DataService,
    injector: Injector
  ) {
    super(injector);
  }

  afterTableConfig() {
    this.storeSubscription(this.dataService.get('types').subscribe(data => {
      this.tableConfig.selects.find(s => s.label === 'Genero').options = data.options;
    }));
    this.storeSubscription(this.dataService.get('attending-options').subscribe(data => {
      this.tableConfig.selects.find(s => s.label === 'Prevision').options = data.options;
    }));
    this.storeSubscription(this.dataService.get('staying-places').subscribe(data => {
      this.tableConfig.selects.find(s => s.label === 'Alojamiento').options = data.options;
    }));
    this.storeSubscription(this.adminService.getGroupNames().subscribe(res => {
      this.tableConfig.selects.find(s => s.label === 'Grupo').options = res;
    }));
  }

}
