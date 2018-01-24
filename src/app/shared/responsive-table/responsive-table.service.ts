import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UtilService } from '../services/util.service';

import { Pagination } from './models/pagination';
import { ResponsiveTableConfig } from './models/responsive-table-config';
import { ResponsiveTableFilter } from './models/responsive-table-filter';

@Injectable()
export class ResponsiveTableService {

  private tableConfig: ResponsiveTableConfig;
  private elements: any[];
  private filterParams: ResponsiveTableFilter;
  private filteredElements: any[];
  private activeElements$: BehaviorSubject<any[]>;
  private activeElementsObservable$: Observable<any[]>;
  private pagination$: BehaviorSubject<Pagination>;
  private paginationObservable$: Observable<Pagination>;

  constructor(
    private util: UtilService
  ) {
    this.activeElements$ = new BehaviorSubject([]);
    this.pagination$ = new BehaviorSubject(new Pagination);
  }

  setConfig(config: ResponsiveTableConfig): void {
    this.tableConfig = config;
  }

  setElements(elements: any[], filterParams: ResponsiveTableFilter): void {
    this.elements = elements;
    this.filter(filterParams);
  }

  activeElements(): Observable<any[]> {
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

  filter(filterParams: ResponsiveTableFilter): void {
    this.filterParams = filterParams;
    this.filteredElements = this.applyFilter();
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
    // Apply search filter
    result = this.elements.filter(e => e[this.tableConfig.search.property].toLowerCase().match(this.filterParams.searchStr.toLowerCase()));
    // Apply selects filter
    for (const select of this.filterParams.selects) {
      if (select.value) {
        result = result.filter(e => this.util.resolveComplexProperty(e, select.property) === select.value);
      }
    }
    return result;
  }

  private getActiveElementsForPage(page_size, current): any[] {
    --current;
    return this.filteredElements.slice(current * page_size, (current + 1) * page_size);
  }

  private generatePagination(filteredElements: any[]): Pagination {
    return {
      current: 1,
      total: Math.ceil(filteredElements.length / this.tableConfig.page_size),
      page_size: this.tableConfig.page_size
    };
  }

}