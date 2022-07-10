import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardMainComponent } from './dashboard-main.component';
import { DashboardMainService } from './dashboard-main.service';

@NgModule({
  declarations: [DashboardMainComponent],
  imports: [
    CommonModule
  ],
  providers: [DashboardMainService],
  exports: [DashboardMainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardMainModule { }
