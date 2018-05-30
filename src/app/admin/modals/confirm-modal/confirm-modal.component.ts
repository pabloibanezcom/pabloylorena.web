import { Component, EventEmitter, Input, Output } from '@angular/core';

interface ConfirmProperties {
  name: string;
  label: string;
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.less']
})
export class ConfirmModalComponent {

  @Input() question: string;
  @Input() element: any;
  @Input() properties: ConfirmProperties[];

  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  onConfirm() {
    this.confirm.emit(true);
  }

  onCancel() {
    this.cancel.emit(true);
  }

}
