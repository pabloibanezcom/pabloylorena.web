import { Component, Input, OnInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { ResponsiveTableConfig } from './models/responsive-table-config';
import { UtilService } from '../services/util.service';
import { ResponsiveService } from '../services/responsive.service';
import { ResponsiveTableService } from './responsive-table.service';
import { ResponsiveTableFilter } from './models/responsive-table-filter';
import { DynamicComponentsService } from '../services/dynamic-components.service';
import { AttendingLabelComponent } from '../components/attending-label/attending-label.component';
import { InjectComponentDirective } from '../directives/inject-component.directive';

@Component({
  selector: 'app-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.less']
})
export class ResponsiveTableComponent implements OnInit, OnChanges {

  sortPropertiesDirections: any;
  sizeCode: string;
  filterParams: ResponsiveTableFilter;
  searchStr: string;

  activeElements: any[];

  @Input() config: ResponsiveTableConfig;
  @Input() elements: any[];
  @Input() components: any;

  constructor(
    private dynamicComponentsService: DynamicComponentsService,
    private util: UtilService,
    private responsiveService: ResponsiveService,
    private responsiveTableService: ResponsiveTableService
  ) {
    this.filterParams = new ResponsiveTableFilter();
    this.sortPropertiesDirections = {};
    this.updateSizeCode(window.screen.width);
  }

  ngOnInit() {
    this.responsiveTableService.setConfig(this.config);
    this.responsiveTableService.setElements(this.elements, this.filterParams);
    this.responsiveTableService.activeElements().subscribe(activeElements => {
      this.activeElements = activeElements;
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (!simpleChanges.elements.firstChange) {
      this.responsiveTableService.setElements(simpleChanges.elements.currentValue, this.filterParams);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateSizeCode(event.target.innerWidth);
  }

  updateSizeCode(innerWidth: number) {
    this.sizeCode = this.responsiveService.getSizeCode(innerWidth);
  }

  search(searchStr: string) {
    this.filterParams.searchStr = searchStr;
    if (this.filterParams.searchStr === '' || this.filterParams.searchStr.length >= this.config.search.min_chars) {
      this.responsiveTableService.filter(this.filterParams);
    }
  }

  setSelect(property, option, select) {
    let value;
    if (option) {
      select.selectedName = option[select.name_property];
      value = option[select.value_property];
    } else {
      select.selectedName = null;
      value = null;
    }
    const filterSelect = this.filterParams.selects.find(s => s.property === property);
    if (filterSelect) {
      filterSelect.value = value;
    } else {
      this.filterParams.selects.push({ property: property, value: value });
    }
    this.responsiveTableService.filter(this.filterParams);
  }

  sortBy(property: string): void {
    let direction;
    this.elements.sort((a, b): number => {
      direction = 0;
      if (this.util.resolveComplexProperty(a, property) > this.util.resolveComplexProperty(b, property)) {
        direction = !this.sortPropertiesDirections[property] ? 1 : -1;
      }
      if (this.util.resolveComplexProperty(a, property) < this.util.resolveComplexProperty(b, property)) {
        direction = this.sortPropertiesDirections[property] ? 1 : -1;
      }
      return direction;
    });
    this.sortPropertiesDirections = {};
    this.sortPropertiesDirections[property] = direction;
  }
}
