import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-two-factor-authentication-dialog',
  templateUrl: './two-factor-authentication-dialog.component.html',
  styleUrls: ['./two-factor-authentication-dialog.component.scss']
})
export class TwoFactorAuthenticationDialogComponent implements OnInit {

  qrCodeImageUrl: any;
  local_data: any;
  totpForm: FormGroup = new FormGroup({});
  secret_key: string = '';
  secretKey: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<TwoFactorAuthenticationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.local_data = {...data}
    console.log(this.local_data)
    this.secret_key = this.local_data.mfa.secret;
  }

  ngOnInit(): void {
    this.getImageUrl();

    this.totpForm = this._formBuilder.group({
      totp: ['',[Validators.required, Validators.maxLength(25)]]
    })
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getImageUrl() {
    console.log(this.local_data.qr_code_data_url)
    this.qrCodeImageUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(this.local_data.mfa.qr_code_data_url);
  }

  onSubmit() {
    // let sendUserDetails = {
    //   username: this.local_data.username,
    //   password: this.local_data.password,
    //   totp: this.totpForm.controls['totp'].value
    // }

    // this.dialogRef.close({event: 'enable-mfa', data: sendUserDetails});
  }
}
