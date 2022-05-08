import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';


@Component({
  selector: 'app-url-shorten-table',
  templateUrl: './url-shorten-table.component.html',
  styleUrls: ['./url-shorten-table.component.scss']
})
export class UrlShortenTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
