import { Component } from '@angular/core';
import { BaseSectionComponent } from '../base-section/base-section.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent extends BaseSectionComponent {

  public modelName: string = 'group';

  afterTableConfig() {
    this.tableConfig.selects.find(s => s.label === 'Anfitrion').options = [
      {
        'host': 'Pablo'
      },
      {
        'host': 'Lorena'
      },
      {
        'host': 'Ambos'
      }
    ];
  }
}
