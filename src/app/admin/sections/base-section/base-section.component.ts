import { Component, OnInit } from '@angular/core';
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
  public deleteMode: boolean;

  constructor(private util: UtilService,
    private adminService: AdminService) {
    super();
  }

  ngOnInit() {
    this.storeSubscription(this.adminService.getTableConfig(this.modelName).subscribe(res => {
      this.tableConfig = res;
      this.tableConfig.new_element.click = this.addElement.bind(this);
      this.tableConfig.other_actions[0].click = this.editElement.bind(this);
      this.tableConfig.other_actions[1].click = this.removeElement.bind(this);
      this.refreshResult();
    }));
  }

  refreshResult() {
    this.storeSubscription(this.adminService.getResult(this.modelName).subscribe(res => {
      this.result = res;
    }));
  }

  addElement() {
    this.deleteMode = false;
    this.selectedElement = this.adminService.generateNewModel(this.modelName);
    this.util.showModal(`rsvp-${this.modelName}-modal`);
  }

  editElement(element: any) {
    this.deleteMode = false;
    this.selectedElement = element;
    this.util.showModal(`rsvp-${this.modelName}-modal`);
  }

  removeElement(element: any) {
    this.deleteMode = true;
    this.selectedElement = element;
    this.util.showModal(`rsvp-${this.modelName}-modal`);
  }

  afterModal(event: any) {
    this.deleteMode = false;
    if (event.refreshData) {
      this.refreshResult();
    }
    this.util.hideModal(`rsvp-${this.modelName}-modal`);
  }

}
