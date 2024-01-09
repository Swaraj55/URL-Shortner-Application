import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from './user-profile.service';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog'
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';

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
