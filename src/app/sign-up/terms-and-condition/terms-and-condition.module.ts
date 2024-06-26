import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsAndConditionComponent } from './terms-and-condition.component';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TermsAndConditionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule
  ],
  exports: [TermsAndConditionComponent],
})
export class TermsAndConditionModule {}
