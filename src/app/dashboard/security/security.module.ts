import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityComponent } from './security.component';

//Angular Material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SecurityComponent],
  exports: [SecurityComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SecurityModule {}
