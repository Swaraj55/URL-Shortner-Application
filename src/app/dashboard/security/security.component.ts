import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecurityService } from './security.service';
@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  resetPassword: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  mfaStatus: string = 'Off';
  slideMfaStatus =  new FormControl();
  textColorAccdToStatus: string = 'mfa-off'

  statusOfMFA: boolean;

  @ViewChild('updateResetForm')  updateResetForm: NgForm;

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.resetPassword = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordWithNoSpace]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: [
        this.comparePassword('newPassword', 'confirmPassword')
      ]
    });

    this.multiFactorAuthStatus();
    this.userInformation()
    this.handleFormChanges();
  }

  passwordWithNoSpace(control: AbstractControl) {
    if(control.value) {
      if((control.value as string).indexOf(' ') >= 0) {
        return {noSpace: true}
      }
      return null;
    }
  }

  //Custom Validator for password and confirm password to check they are same or not
  private comparePassword(newPassword: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[newPassword];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if(passwordControl.pristine && confirmPasswordControl.pristine) {
        return null;
      }

      if(passwordControl.value !== confirmPasswordControl.value && passwordControl && confirmPasswordControl) {
        confirmPasswordControl.setErrors({notSame: true});
      }
    }
  }
  // Custom Validator to check new password must be different from current password
 
  handleFormChanges() {
    //@ts-ignore
    this.resetPassword.get('newPassword').valueChanges.subscribe(newPassword => {
      let originalPassword = this.resetPassword.get('currentPassword')?.value
      let formGroup: FormGroup = this.resetPassword; 
      const newPasswordControl = formGroup.controls['newPassword'];
      if(newPassword === originalPassword) {
        newPasswordControl.setErrors({currentNewMatch: true});
      }
    });
  }

  slideMFAStatus() {
    if(!this.slideMfaStatus.value) {
      this.statusOfMFA = false
      this.mfaStatus = 'Off';
      this.textColorAccdToStatus = 'mfa-off';
      this.multiFactorAuthStatus();
    } else {
      this.mfaStatus = 'On';
      this.textColorAccdToStatus = 'mfa-on'
      this.statusOfMFA = true;
      this.multiFactorAuthStatus();
    }
  }

  multiFactorAuthStatus() {
    let payload = {
      mfaStatus: this.statusOfMFA,
      creator: `${sessionStorage.getItem('id')}`,
      mfa_option: "Email"
    }
    // console.log("Status...", payload)
    if(payload.mfaStatus !== undefined) {
      this.securityService.enableDisableMFA(payload).subscribe((data: any) => {
        console.log(data)
        if(data.status === 'success') {
          this.openSnackBar(data.message, '', 'mat-snack-bar-success');
        } else {
          this.openSnackBar(data.message, '', 'mat-snack-bar-danger');
        }
      }, (error) => {
        this.openSnackBar(error, '', 'mat-snack-bar-danger');
      }, () => {
        this.userInformation();
      })
    }
  }

  userInformation() {
    let params = {
      creator: `${sessionStorage.getItem('id')}`
    }
    //console.log(params)
    this.securityService.getUserInfo(params).subscribe((data: any) => {
      // console.log(data.result.mfa_status);
      if(data.result.mfa_status) {
        this.mfaStatus = 'On';
        this.textColorAccdToStatus = 'mfa-on'
        this.slideMfaStatus.patchValue(true)
      } 
      
      if(data.result.mfa_status === undefined) {
        this.mfaStatus = 'Off';
        this.textColorAccdToStatus = 'mfa-off';
        this.slideMfaStatus.patchValue(false)
      }
      
    })
  }

  openSnackBar(message: string, action: string, cssClass: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: cssClass,
      duration: 4000,
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    //stop here if form is invalid
    if(this.resetPassword.invalid) {
      return;
    } 

    let payload = {
      "currentpassword": btoa(this.resetPassword.controls['currentPassword'].value),
      "newpassword": btoa(this.resetPassword.controls['newPassword'].value),
      "confirmpassword": btoa(this.resetPassword.controls['confirmPassword'].value),
      "creator": `${sessionStorage.getItem('id')}`
    }

    //console.log(payload)

    this.securityService.updatePasswordChange(payload).subscribe((data: any) => {
      if(data.status === 'success') {
        this.openSnackBar(data.message, '', 'mat-snack-bar-success');
        this.updateResetForm.resetForm({})
      } else {
        this.openSnackBar(data.message, '', 'mat-snack-bar-danger');
      }
    }, (error: any) => {
      this.openSnackBar(error.message, '', 'mat-snack-bar-danger');
    })
  }

}
