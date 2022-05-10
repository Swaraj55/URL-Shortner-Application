import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-url-shorten-table',
  templateUrl: './url-shorten-table.component.html',
  styleUrls: ['./url-shorten-table.component.scss']
})
export class UrlShortenTableComponent implements OnInit {

  length = null;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: any[] = ['url', 'shortUrl', 'createdAt', 'actions'];
  pageEvent: PageEvent;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  sortedData: MatTableDataSource<any>;
  selection = new SelectionModel<any>(false, []);

  constructor() { 
    this.dataSource = new MatTableDataSource();
    this.sortedData = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

}
