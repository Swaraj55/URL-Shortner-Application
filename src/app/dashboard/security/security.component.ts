import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  @ViewChild('updateResetForm')  updateResetForm: NgForm;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.resetPassword = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordWithNoSpace,]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: [
        this.comparePassword('newPassword', 'confirmPassword')
      ]
    });

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
      } else {
        confirmPasswordControl.setErrors(null);
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
      } else {
        newPasswordControl.setErrors(null)
      }
    });
  }

  slideMFAStatus() {
    if(this.slideMfaStatus.value) {
      this.mfaStatus = 'Off';
      this.textColorAccdToStatus = 'mfa-off'
    } else {
      this.mfaStatus = 'On';
      this.textColorAccdToStatus = 'mfa-on'
    }
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
      "creator": `ObjectId(${sessionStorage.getItem('id')})`
    }

    console.log(payload)
    //this.updateResetForm.resetForm({})
  }

}
