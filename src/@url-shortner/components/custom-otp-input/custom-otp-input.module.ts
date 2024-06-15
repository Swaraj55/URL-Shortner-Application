import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomOtpInputComponent } from './custom-otp-input.component';

@NgModule({
  declarations: [CustomOtpInputComponent],
  imports: [
    CommonModule
  ],
  exports: [CustomOtpInputComponent]
})
export class CustomOtpInputModule { }
