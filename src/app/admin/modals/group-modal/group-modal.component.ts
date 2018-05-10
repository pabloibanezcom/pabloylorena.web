import { Component, Injector, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html'
})
export class GroupModalComponent extends BaseModalComponent implements OnInit {

  public modelName: string = 'group';
  hosts: any[];
  editorOptions: any;

  constructor(
    private dataService: DataService,
    injector: Injector
  ) {
    super(injector);
    this.editorOptions = {
      placeholderText: 'Escribe la dedicatoria aquí',
      toolbarButtons: ['bold', 'italic', 'underline'],
      toolbarButtonsXS: ['bold', 'italic', 'underline'],
      toolbarButtonsSM: ['bold', 'italic', 'underline'],
      toolbarButtonsMD: ['bold', 'italic', 'underline']
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.storeSubscription(
      this.dataService.get('hosts').subscribe(data => {
        this.hosts = data.options;
      }));
  }

}
