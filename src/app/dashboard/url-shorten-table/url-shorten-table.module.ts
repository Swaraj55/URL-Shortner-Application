import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UrlShortenTableComponent } from './url-shorten-table.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [UrlShortenTableComponent],
  imports: [
    CommonModule,

    MatTableModule,
    MatPaginatorModule
  ],
  exports: [UrlShortenTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UrlShortenTableModule { }
