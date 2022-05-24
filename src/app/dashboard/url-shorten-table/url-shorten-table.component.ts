import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { UrlShortenTableService } from './url-shorten-table.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActionDialogComponent } from './action-dialog/action-dialog.component';

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
  }

  openDialog(action: string, obj: any) {
    console.log(action, obj);
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
      console.log('Dialog result: ' + JSON.stringify(result));
    });
  }

  openDeleteDialog(data: any) {
    console.log(data);
  }
}
