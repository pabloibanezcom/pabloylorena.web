import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UtilService } from '../services/util.service';

import { Pagination } from './models/pagination';
import { ActiveElementsResult } from './models/activeElementsResult';
import { ResponsiveTableConfig } from './models/responsive-table-config';
import { ResponsiveTableFilter } from './models/responsive-table-filter';

@Injectable()
export class ResponsiveTableService {

  private tableConfig: ResponsiveTableConfig;
  private elements: any[];
  private filterParams: ResponsiveTableFilter;
  private filteredElements: any[];
  private activeElements$: BehaviorSubject<ActiveElementsResult>;
  private activeElementsObservable$: Observable<ActiveElementsResult>;
  private pagination$: BehaviorSubject<Pagination>;
  private paginationObservable$: Observable<Pagination>;

  constructor(
    private util: UtilService
  ) {
    this.activeElements$ = new BehaviorSubject({ filteredElementsLength: null, activeElements: null});
    this.pagination$ = new BehaviorSubject(new Pagination);
  }

  getAuthLevel(authLevelProperty: string): string {
    const treePathArray = authLevelProperty.split('.');
    return JSON.parse(localStorage.getItem(treePathArray[0]))[treePathArray[1]];
  }

  setConfig(config: ResponsiveTableConfig): void {
    this.tableConfig = config;
  }

  setElements(elements: any[], filterParams: ResponsiveTableFilter): void {
    this.elements = elements;
    this.filterAndSort(filterParams, true);
  }

  activeElements(): Observable<ActiveElementsResult> {
    if (!this.activeElementsObservable$) {
      this.activeElementsObservable$ = this.activeElements$.asObservable();
    }
    return this.activeElementsObservable$.share();
  }

  pagination(): Observable<Pagination> {
    if (!this.paginationObservable$) {
      this.paginationObservable$ = this.pagination$.asObservable();
    }
    return this.paginationObservable$.share();
  }

  filterAndSort(filterParams: ResponsiveTableFilter, filter?: boolean): void {
    this.filterParams = filterParams;
    this.filteredElements = filter ? this.applyFilter() : this.filteredElements;
    const pagination = this.generatePagination(this.filteredElements);
    this.pagination$.next(pagination);
    this.activeElements$.next(this.getActiveElementsForPage(pagination.page_size, pagination.current));
  }

  goToPage(page: number): void {
    const pagination = this.pagination$.getValue();
    pagination.current = page;
    this.pagination$.next(pagination);
    this.activeElements$.next(this.getActiveElementsForPage(pagination.page_size, pagination.current));
  }

  private applyFilter(): any[] {
    let result = [];
    const propertiesMatch = this.tableConfig.search.property.split(' ');
    // Apply search filter
    propertiesMatch.forEach(p => {
      result = result.concat(this.elements.filter(e => e[p].toLowerCase().match(this.filterParams.searchStr.toLowerCase())));
    }); 
    // Apply selects filter
    for (const select of this.filterParams.selects) {
      if (select.value !== null && select.value !== undefined) {
        result = result.filter(e => this.util.resolveComplexProperty(e, select.property) === select.value);
      }
    }
    return result;
  }

  private applySort(): any[] {
    if (this.filterParams.sort.property) {
      return this.filteredElements.sort((a, b) => {
        if (a.fullName < b.fullName) { return this.filterParams.sort.direction === true ? -1 : 1; }
        if (a.fullName > b.fullName) { return this.filterParams.sort.direction === false ? 1 : -1; }
        return 0;
      });
    }
    return this.elements;
  }

  private getActiveElementsForPage(page_size, current): ActiveElementsResult {
    --current;
    return {
      filteredElementsLength: this.filteredElements.length,
      activeElements: this.filteredElements.slice(current * page_size, (current + 1) * page_size)
    };
  }

  private generatePagination(filteredElements: any[]): Pagination {
    return {
      current: 1,
      total: Math.ceil(filteredElements.length / this.tableConfig.page_size),
      page_size: this.tableConfig.page_size
    };
  }

}
