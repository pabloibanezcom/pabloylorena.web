import { Directive, OnInit, Input, ViewContainerRef } from '@angular/core';
import { DynamicComponentsService } from '../services/dynamic-components.service';

@Directive({
  selector: '[appInjectComponent]'
})
export class InjectComponentDirective implements OnInit {

  @Input() appInjectComponent: string;
  @Input() inputs: any[];

  constructor(
    private dynamicComponentsService: DynamicComponentsService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.dynamicComponentsService.generateComponent(this.viewContainerRef, this.appInjectComponent, this.inputs);
  }

}
