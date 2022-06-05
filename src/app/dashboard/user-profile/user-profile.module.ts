import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from './user-profile.service';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [UserProfileComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserProfileService]
})
export class UserProfileModule { }
