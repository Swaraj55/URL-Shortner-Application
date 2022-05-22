import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardMainComponent } from './dashboard-main.component';

@NgModule({
  declarations: [DashboardMainComponent],
  imports: [
    CommonModule
  ],
  exports: [DashboardMainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardMainModule { }
