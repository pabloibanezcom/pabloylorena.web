import { Component, OnInit, Input } from '@angular/core';

import { ResponsiveTableService } from '../responsive-table.service';
import { Pagination } from '../models/pagination';

@Component({
  selector: 'app-responsive-table-pagination',
  templateUrl: './responsive-table-pagination.component.html',
  styleUrls: ['./responsive-table-pagination.component.less']
})
export class ResponsiveTablePaginationComponent implements OnInit {

  pagination: Pagination;
  pages: number[];

  constructor(
    private responsiveTableService: ResponsiveTableService
  ) { }

  ngOnInit() {
    this.responsiveTableService.pagination().subscribe(pagination => {
      this.pagination = pagination;
      this.generatePages();
    });
  }

  generatePages(): void {
    this.pages = [];
    for (let i = 1; i <= this.pagination.total; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    this.responsiveTableService.goToPage(page);
  }

}
