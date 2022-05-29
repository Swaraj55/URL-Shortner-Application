import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { UrlShortenTableService } from './url-shorten-table.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ActionDialogComponent } from './action-dialog/action-dialog.component';
import { DeleteDialogComponent } from '../../../@url-shortner/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-url-shorten-table',
  templateUrl: './url-shorten-table.component.html',
  styleUrls: ['./url-shorten-table.component.scss']
})
export class UrlShortenTableComponent implements OnInit {

  urlShortnerData: any[] = [];
  length: any = null;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: any[] = ['custom_type', 'url', 'shortUrl', 'status', 'createdAt', 'actions'];
  pageEvent: PageEvent;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  sortedData: MatTableDataSource<any>;
  selection = new SelectionModel<any>(false, []);

  constructor(
    private urlShortenTableService: UrlShortenTableService,
    private _dialog: MatDialog
  ) { 
    this.dataSource = new MatTableDataSource();
    this.sortedData = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getRowsData();

    this.urlShortnerData.length = 0;
  }

  openDialog(action: string, obj: any) {
    // console.log(action, obj);
    obj['action'] = action;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxWidth = '500px';
    dialogConfig.data = obj;
    dialogConfig.panelClass = 'custom-dialog-container';

    //User row data being injected into the child component.
    // Open the form dialog and pass the data from the user selected row in the data table.
    const dialogRef = this._dialog.open(ActionDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        if(result?.event === 'Add') {
          this.addRowData(result.data);
        } else if(result?.event === 'Update') {
          this.updateRowData(result.data);
        } 
      });
  }

  openDeleteDialog(data: any) {
    console.log(data);
    const deleteDialogConfig = new MatDialogConfig();
    deleteDialogConfig.disableClose = true;
    deleteDialogConfig.autoFocus = true;
    deleteDialogConfig.width = '33%';
    deleteDialogConfig.maxWidth = 460;
    deleteDialogConfig.data = data;

    // Open the dialog and pass the data from the user selected row in the data table.
    const deleteDialogRef = this._dialog.open(DeleteDialogComponent, deleteDialogConfig);

    // Close the dialog and delete the row data.
    // The payload is a property in the result response and is included in the body of the delete POST request.
    deleteDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRow(result.payload);
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.sortedData.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'createdAt':
          return compare(a.createdAt, b.createdAt, isAsc);
        default:
          return 0;
      }
    });
  }

  // Add row data to the table.
  addRowData(rowData: any) {
    console.log(rowData);
    this.urlShortenTableService.createUrlShorten(rowData).subscribe((data: any) => {
      console.log(data);
    })
  }

  // Update row data in the table.
  updateRowData(rowData: any) {
    console.log(rowData);
  }

  deleteRow(rowData: any) {
    console.log(rowData);
  }

  getRowsData() {
    let params = {
      creator: `${sessionStorage.getItem('id')}`,
    }
    this.urlShortenTableService.getUrlShortenTableData(params).subscribe((data: any) => {
      console.log(data);
      this.urlShortnerData.length = 0;
      if(data.status === 'success') {
        const shortUrlData = data.result;
        shortUrlData.forEach((element: any) => {
          // console.log(element);
          let urlObj = {
            custom_type: element.url_type,
            url: element.main_url,
            shortUrl: element.shorted_url,
            status: element.status,
            createdAt: new Date(element.url_created_date).toLocaleString()
          }

          this.urlShortnerData.push(urlObj);
        });
        this.dataSource = new MatTableDataSource(this.urlShortnerData);
        this.length = this.urlShortnerData.length;
        this.dataSource.sort = this.sort;
        this.sortedData = this.dataSource;
        this.dataSource.paginator = this.paginator;

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

