import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent {

  @Output() linkClick: any = new EventEmitter();

  constructor() { }

  onLinkClick() {
    this.linkClick.emit();
  }

}
