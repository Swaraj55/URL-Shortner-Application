import { Component, HostListener, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomOtpInputComponent } from 'src/@url-shortner/components/custom-otp-input/custom-otp-input.component';

@Component({
  selector: 'app-two-factor-auth-dialog',
  templateUrl: './two-factor-auth-dialog.component.html',
  styleUrls: ['./two-factor-auth-dialog.component.scss', '../../../theme.scss']
})
export class TwoFactorAuthDialogComponent implements OnInit {

  twoFactorForm: FormGroup = new FormGroup({});
  local_data: any;
  otpValue: string;
  allFieldsFilled: boolean = false;

  @ViewChild('customOtpInputComponent', {static: true}) customOtpInputComponent: CustomOtpInputComponent;

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
  
  constructor(
    public dialogRef: MatDialogRef<TwoFactorAuthDialogComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.local_data = {...data}
  }

  ngOnInit(): void { }

  onOtpChange(otp: string): void {
    this.otpValue = otp;
  }

  onAllFieldsFilled(filled: boolean): void {
    this.allFieldsFilled = filled;
  }

  onVerify(): void {
    if (this.allFieldsFilled) {
      let obj = {
        username: this.local_data.username,
        password: this.local_data.password,
        totp: this.otpValue
      }
      
      this.dialogRef.close({event: 'verify-totp', data: obj});
    } else {
      this.customOtpInputComponent.markFieldsInvalid();
      console.error('All OTP fields are not filled.');
    }
  }
}
