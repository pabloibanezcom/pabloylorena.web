import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ResponsiveService } from '../services/responsive.service';
import { ActiveElementsResult } from './models/activeElementsResult';
import { ResponsiveTableConfig } from './models/responsive-table-config';
import { ResponsiveTableFilter } from './models/responsive-table-filter';
import { ResponsiveTableService } from './responsive-table.service';


@Component({
  selector: 'app-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.less'],
  providers: [
    ResponsiveTableService
  ]
})
export class ResponsiveTableComponent implements OnInit, OnChanges {

  sizeCode: string;
  filterParams: ResponsiveTableFilter;
  searchStr: string;
  authLevel: string;
  activeElementsResult: ActiveElementsResult;
  @Input() config: ResponsiveTableConfig;
  @Input() elements: any[];
  @Input() components: any;
  @Input() externalFilter: any;

  constructor(
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
      this.activeElementsResult = activeElementsResult;
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.elements && !simpleChanges.elements.firstChange) {
      this.responsiveTableService.setElements(simpleChanges.elements.currentValue, this.filterParams);
    }
    if (simpleChanges.externalFilter && simpleChanges.externalFilter.currentValue) {
      this.filterParams.selects = this.filterParams.selects.filter(s => s.group !== simpleChanges.externalFilter.currentValue.group);
      this.filterParams.selects.push(simpleChanges.externalFilter.currentValue);
      this.responsiveTableService.filterAndSort(this.filterParams, true);
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
    // TO-DO
  }
}
