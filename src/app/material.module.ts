import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';

// Re-usable component
import { CustomInputComponent } from '@url-shortner/components/custom-input/custom-input.component';
import { CustomOtpInputComponent } from '@url-shortner/components/custom-otp-input/custom-otp-input.component';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    CustomInputComponent,
    CustomOtpInputComponent
  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTooltipModule,

    CustomInputComponent,
    CustomOtpInputComponent
  ],
})
export class MaterialModule {}