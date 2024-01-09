import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UrlShortenTableComponent } from './url-shorten-table.component';
import { ActionDialogComponent } from './action-dialog/action-dialog.component';
import { UrlShortenTableService } from './url-shorten-table.service';

import { HttpClientModule } from '@angular/common/http';

import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyOptionModule as MatOptionModule} from '@angular/material/legacy-core';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog'

import { DeleteDialogComponent } from '../../../@url-shortner/components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [UrlShortenTableComponent, ActionDialogComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    // HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  exports: [UrlShortenTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UrlShortenTableService]
})
export class UrlShortenTableModule { }
