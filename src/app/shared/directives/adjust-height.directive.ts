import { Directive, OnInit, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAdjustHeight]'
})
export class AdjustHeightDirective implements OnInit {

  @Input() appAdjustHeight: number;
  element: ElementRef;

  constructor(el: ElementRef) {
    this.element = el;
  }

  ngOnInit() {
    this.element.nativeElement.style.minHeight =  (window.screen.height - this.appAdjustHeight) + 'px';
  }

}
