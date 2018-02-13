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

  sizeCode: string;
  filterParams: ResponsiveTableFilter;
  searchStr: string;
  authLevel: string;
  filteredElementsLength: number;
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
    this.updateSizeCode(window.screen.width);
  }

  ngOnInit() {
    this.authLevel = this.responsiveTableService.getAuthLevel(this.config.authLevelProperty);
    this.responsiveTableService.setConfig(this.config);
    this.responsiveTableService.setElements(this.elements, this.filterParams);
    this.responsiveTableService.activeElements().subscribe(activeElementsResult => {
      this.filteredElementsLength = activeElementsResult.filteredElementsLength;
      this.activeElements = activeElementsResult.activeElements;
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
      this.responsiveTableService.filterAndSort(this.filterParams, true);
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
    this.responsiveTableService.filterAndSort(this.filterParams, true);
  }

  sortBy(property: string): void {
    // this.filterParams.sort.direction = this.filterParams.sort.property === property ? false : true;
    // this.filterParams.sort.property = property;
    // this.responsiveTableService.filterAndSort(this.filterParams);
  }
}
