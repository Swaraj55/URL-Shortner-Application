import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { CustomOtpInputComponent } from 'src/@url-shortner/components/custom-otp-input/custom-otp-input.component';

@Component({
  selector: 'app-two-factor-authentication-dialog',
  templateUrl: './two-factor-authentication-dialog.component.html',
  styleUrls: ['./two-factor-authentication-dialog.component.scss', '../../../theme.scss']
})
export class TwoFactorAuthenticationDialogComponent implements OnInit {

  qrCodeImageUrl: any;
  local_data: any;
  totpForm: FormGroup = new FormGroup({});
  secret_key: string = '';
  secretKey: boolean = true;
  copied_tooltip_msg: string = 'Copied to clipboard!';
  first_section_visible: boolean = true;

  otpValue: string;
  allFieldsFilled: boolean = false;

  @ViewChild('customOtpInputComponent', {static: true}) customOtpInputComponent: CustomOtpInputComponent;

  constructor(
    private _formBuilder: FormBuilder,
    private _domSanitizer: DomSanitizer,
    private clipboard: Clipboard,
    public dialogRef: MatDialogRef<TwoFactorAuthenticationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.local_data = {...data}
    this.secret_key = this.local_data.mfa.secret;
  }

  ngOnInit(): void {
    this.getImageUrl();
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel', message: this.local_data.message});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getImageUrl() {
    console.log(this.local_data.qr_code_data_url)
    this.qrCodeImageUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(this.local_data.mfa.qr_code_data_url);
  }

  onSubmit() {
    if (this.allFieldsFilled) {
      let sendUserDetails = {
        username: this.local_data.username,
        password: this.local_data.password,
        totp: this.otpValue,
      }

      this.dialogRef.close({event: 'enable-mfa', data: sendUserDetails});
    } else {
      this.customOtpInputComponent.markFieldsInvalid();
      console.error('All OTP fields are not filled.');
    }
  }

  getTruncatedKey(key: string): string {
    const limit = 25;
    const ellipsis = '...';
    return key.length > limit ? key.substring(0, limit) + ellipsis : key;
  }

  copyText(key: string) {
    this.copied_tooltip_msg = 'Secret key copied to clipboard!';
    this.clipboard.copy(key);

    setTimeout(() => this.copied_tooltip_msg = 'Copied to clipboard!', 2000);
  }

  secondSection() {
    this.first_section_visible = false;
  }

  onOtpChange(otp: string): void {
    console.log(otp)
    this.otpValue = otp;
  }

  onAllFieldsFilled(filled: boolean): void {
    this.allFieldsFilled = filled;
  }
}
