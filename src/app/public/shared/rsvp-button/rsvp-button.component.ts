import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rsvp-button',
  templateUrl: './rsvp-button.component.html',
  styleUrls: ['./rsvp-button.component.less']
})
export class RsvpButtonComponent implements OnInit {

  @Output() click = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(evt: Event) {
    this.click.emit();
  }

}
