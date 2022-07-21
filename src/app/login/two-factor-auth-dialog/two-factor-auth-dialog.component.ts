import { Component, HostListener, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-two-factor-auth-dialog',
  templateUrl: './two-factor-auth-dialog.component.html',
  styleUrls: ['./two-factor-auth-dialog.component.scss', '../../../theme.scss']
})
export class TwoFactorAuthDialogComponent implements OnInit {

  twoFactorForm: FormGroup = new FormGroup({});
  local_data: any;

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
  
  constructor(
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TwoFactorAuthDialogComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.local_data = {...data}
  }

  ngOnInit(): void {
    this.twoFactorForm = this._formBuilder.group({
      twoFactor: ['',[Validators.maxLength(6), Validators.pattern('^[0-9]*$'), Validators.required]]
    })
  }

  onSubmit() {
    let obj = {
      username: this.local_data.username,
      password: this.local_data.password,
      totp: this.twoFactorForm.controls['twoFactor'].value
    }
    
    this.dialogRef.close({event: 'verify-totp', data: obj});
  }
}
