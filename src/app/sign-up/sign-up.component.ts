import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, UntypedFormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignUpService } from './sign-up.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../../theme.scss'],
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({});
  isSubmitted: Boolean = false;

  @ViewChild('updateSignupForm')  updateSignupForm: NgForm;
  
  isCheckboxChecked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignUpService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8), this.passwordWithNoSpace]],
      confirmPassword: ['',[Validators.required, this.passwordWithNoSpace]],
      termsAndCondition: [false]
    }, {
      validators: [
        this.comparePassword('password', 'confirmPassword')
      ]
    });

    this.signupForm.controls['termsAndCondition'].valueChanges.subscribe((data) => {
      this.isCheckboxChecked = data;
    })
  }

  get nameControl(): UntypedFormControl {
    return this.signupForm.get('name') as UntypedFormControl;
  }

  get emailControl(): UntypedFormControl {
    return this.signupForm.get('email') as UntypedFormControl;
  }

  get passwordControl(): UntypedFormControl {
    return this.signupForm.get('password') as UntypedFormControl;
  }

  get confirmPasswordControl(): UntypedFormControl {
    return this.signupForm.get('confirmPassword') as UntypedFormControl;
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
  private comparePassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
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

  openSnackBar(message: string, action: string, cssClass: string) {
    this._snackBar.open(message, action, {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: cssClass,
        duration: 4000
   });
  } 

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '50%';
    dialogConfig.maxHeight = '600px';
    dialogConfig.data = '';
    dialogConfig.panelClass = 'bg-image'

    const dialogRef = this.dialog.open(TermsAndConditionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.signupForm.controls['termsAndCondition'].setValue(true)
      } else {
        this.signupForm.controls['termsAndCondition'].setValue(false);
      }
    })
  }

  onSubmit() {
    this.isSubmitted = true;

    //stop here if form is invalid
    if(this.signupForm.invalid) {
      return;
    } 

    let d = new Date();
    let payload = {
      "email": this.signupForm.controls['email'].value,
      "password": btoa(this.signupForm.controls['password'].value),
      "confirm_password": btoa(this.signupForm.controls['confirmPassword'].value),
      "username": this.signupForm.controls['name'].value,
      "account_creation": d.toISOString()
    }

    // console.log(payload);
    this.signupService.signUpUser(payload).subscribe((data: any) => {
      if(data.status === 'success') {
        this.openSnackBar('You successfully signup in URL Shortner!', '', 'mat-snack-bar-success');
        this.router.navigate(['/login']);
        this.updateSignupForm.resetForm({});
      } else {
        this.openSnackBar('Something went wrong!', '', 'mat-snack-bar-danger');
      }
    })
  }

  navigateTo(): void {
    this.router.navigate(['/login'])
  }
}
