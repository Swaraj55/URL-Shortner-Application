import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { SignUpService } from './sign-up.service';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatCheckboxModule
  ],
  exports: [SignUpComponent],
  providers: [SignUpService],
})
export class SignUpModule { }
