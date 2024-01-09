import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from './user-profile.service';

import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatIconModule} from '@angular/material/icon'
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog'
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyOptionModule as MatOptionModule} from '@angular/material/legacy-core';

import { UserProfileActionDialogComponent } from './user-profile-action-dialog/user-profile-action-dialog.component';

@NgModule({
  declarations: [UserProfileComponent, UserProfileActionDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatStepperModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule
  ],
  exports: [UserProfileComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserProfileService],
  entryComponents: [UserProfileActionDialogComponent]
})
export class UserProfileModule { }
