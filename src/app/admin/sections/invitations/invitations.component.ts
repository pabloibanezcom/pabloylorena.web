import { Component, Injector } from '@angular/core';
import { Invitation } from '../../../shared/models';
import { DataService } from '../../../shared/services/data.service';
import { BaseSectionComponent } from '../base-section/base-section.component';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.less']
})
export class InvitationsComponent extends BaseSectionComponent {

  public modelName: string = 'invitation';

  constructor(
    private dataService: DataService,
    injector: Injector
  ) {
    super(injector);
  }

  afterTableConfig() {
    this.tableConfig.other_actions[0].click = this.viewInvitation.bind(this);
    this.tableConfig.other_actions[1].click = this.editElement.bind(this);
    this.tableConfig.other_actions[2].click = this.removeElement.bind(this);
    this.storeSubscription(this.adminService.getGroupNames().subscribe(res => {
      this.tableConfig.selects.find(s => s.label === 'Grupo').options = res;
    }));
    this.storeSubscription(this.dataService.get('notInPaper-options').subscribe(data => {
      this.tableConfig.selects.find(s => s.label === 'No papel').options = data.options;
    }));
  }

  viewInvitation(invitation: Invitation) {
    window.open('admin/invitation/' + invitation._id);
  }

}
