import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared';
import { UtilService } from '../../../shared/services/util.service';
import { AdminService, Result } from '../../admin-core';

@Component({
  selector: 'app-base-section',
  template: ''
})
export class BaseSectionComponent extends BaseComponent implements OnInit {

  public modelName: string;
  public tableConfig: any;
  public result: Result;
  public selectedElement: any;
  public editMode: boolean;
  public deleteMode: boolean;

  protected util: UtilService;
  protected adminService: AdminService;

  constructor(injector: Injector) {
    super();
    this.util = injector.get(UtilService);
    this.adminService = injector.get(AdminService);
  }

  ngOnInit() {
    this.storeSubscription(this.adminService.getTableConfig(this.modelName).subscribe(res => {
      this.tableConfig = res;
      if (this.tableConfig.new_element) {
        this.tableConfig.new_element.click = this.addElement.bind(this);
      }
      if (this.tableConfig.other_actions[0]) {
        this.tableConfig.other_actions[0].click = this.editElement.bind(this);
      }
      if (this.tableConfig.other_actions[1]) {
        this.tableConfig.other_actions[1].click = this.removeElement.bind(this);
      }
      this.afterTableConfig();
      this.refreshResult();
    }));
  }

  refreshResult() {
    this.storeSubscription(this.adminService.getResult(this.modelName).subscribe(res => {
      this.result = res;
      this.afterRefreshResult();
    }));
  }

  addElement() {
    this.editMode = false;
    this.deleteMode = false;
    this.selectedElement = this.adminService.generateNewModel(this.modelName);
    this.util.showModal(`rsvp-${this.modelName}-modal`);
  }

  editElement(element: any) {
    this.editMode = true;
    this.deleteMode = false;
    this.selectedElement = element;
    this.util.showModal(`rsvp-${this.modelName}-modal`);
  }

  removeElement(element: any) {
    this.editMode = false;
    this.deleteMode = true;
    this.selectedElement = element;
    this.util.showModal(`rsvp-${this.modelName}-modal`);
  }

  afterModal(event: any) {
    this.editMode = false;
    this.deleteMode = false;
    if (event.refreshData) {
      this.refreshResult();
    }
    this.util.hideModal(`rsvp-${this.modelName}-modal`);
    this.afterModalFinish();
  }

  afterTableConfig() {
    // TO OVERRIDE BY DERIVED CLASS
  }

  afterRefreshResult() {
    // TO OVERRIDE BY DERIVED CLASS
  }

  afterModalFinish() {
    // TO OVERRIDE BY DERIVED CLASS
  }

}
