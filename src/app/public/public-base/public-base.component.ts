import { Component, OnInit } from '@angular/core';

import { TemplateService } from '../shared/services/template.service';

@Component({
  selector: 'app-public-base',
  templateUrl: './public-base.component.html',
  styleUrls: ['./public-base.component.less']
})
export class PublicBaseComponent implements OnInit {

  constructor(private templateService: TemplateService) { }

  ngOnInit() {
    this.templateService.init();
  }

}
