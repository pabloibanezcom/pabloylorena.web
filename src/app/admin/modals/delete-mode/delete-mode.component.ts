import { Component, EventEmitter, Input, Output } from '@angular/core';

interface DeleteProperties {
  name: string;
  label: string;
}

@Component({
  selector: 'app-delete-mode',
  templateUrl: './delete-mode.component.html',
  styleUrls: ['./delete-mode.component.less']
})
export class DeleteModeComponent {

  @Input() question: string;
  @Input() element: any;
  @Input() properties: DeleteProperties[];

  @Output() confirmDelete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  onConfirmDelete() {
    this.confirmDelete.emit(true);
  }

  onCancel() {
    this.cancel.emit(true);
  }

}
