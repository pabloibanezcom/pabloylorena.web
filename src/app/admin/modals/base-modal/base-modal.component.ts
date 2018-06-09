import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../../shared';
import { AdminService, NotificationService } from '../../admin-core';

@Component({
  selector: 'app-base-modal',
  template: ''
})
export class BaseModalComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() editMode: boolean;
  @Input() deleteMode: boolean;
  @Input() element: any;
  @Output() ending: any = new EventEmitter();

  modelName: string;
  modalElement: any;

  protected adminService: AdminService;
  protected notificationService: NotificationService;

  constructor(injector: Injector) {
    super();
    this.adminService = injector.get(AdminService);
    this.notificationService = injector.get(NotificationService);
  }

  ngOnInit() {
    this.setModalElement(this.element);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.element) {
      this.setModalElement(changes.element.currentValue);
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.updateElement();
    } else {
      this.addElement();
    }
  }

  addElement() {
    this.beforeAddOrUpdate();
    this.storeSubscription(this.adminService.createElement(this.modalElement, this.modelName)
      .subscribe(res => this.afterSubscribe(res)));
  }

  updateElement() {
    this.beforeAddOrUpdate();
    this.storeSubscription(this.adminService.updateElement(this.modalElement, this.modelName)
      .subscribe(res => this.afterSubscribe(res)));
  }

  confirmDelete() {
    this.storeSubscription(this.adminService.removeElement(this.modalElement, this.modelName)
      .subscribe(res => this.afterSubscribe(res)));
  }

  cancel() {
    this.setModalElement(this.element);
    this.ending.emit({ refreshData: false });
  }

  private afterSubscribe(res: any) {
    this.ending.emit({ refreshData: true });
    if (!this.editMode && !this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Elemento creado con exito',
        this.modalElement + ' ha sido creado.');
    }
    if (this.editMode && !this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Elemento actualizado con exito',
        this.modalElement + ' ha sido actualizado.');
    }
    if (this.deleteMode) {
      this.notificationService.processHttpResult(res, 'Elemento eliminado con exito',
        this.modalElement + ' ha sido eliminado.');
    }
    this.element = null;
  }

  protected setModalElement(element: any): void {
    if (element) {
      this.modalElement = Object.assign({}, element);
    } else {
      this.modalElement = this.adminService.generateNewModel(this.modelName);
    }
  }

  protected beforeAddOrUpdate() {
    // TO OVERRIDE BY DERIVED CLASS
  }

}
