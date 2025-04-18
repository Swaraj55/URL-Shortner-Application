import { Component, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  NgForm,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TwoFactorAuthDialogComponent } from '@app/auth/login/two-factor-auth-dialog/two-factor-auth-dialog.component';
import { TwoFactorAuthenticationDialogComponent } from '@app/auth/login/two-factor-authentication-dialog/two-factor-authentication-dialog.component';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '@url-shortner/services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { login } from '../state/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: UntypedFormGroup = new UntypedFormGroup({});
  isSubmitted: Boolean = false;

  @ViewChild('updateLoginForm') updateLoginForm: NgForm;
  isCheckboxChecked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private cookieService: CookieService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required, 
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordWithNoSpace,
        ],
      ],
      remember_me: [false],
    });
  }

  passwordWithNoSpace(control: AbstractControl) {
    if (control.value) {
      if ((control.value as string).indexOf(' ') >= 0) {
        return { noSpace: true };
      }
      return null;
    }
  }

  ngOnInit(): void {
    this.loginForm.controls['remember_me'].valueChanges.subscribe((data) => {
      this.isCheckboxChecked = data;
    })

    if(this.cookieService.get('rememberMe')) {
      this.loginForm.controls['remember_me'].setValue((this.cookieService.get('rememberMe') === 'true'));
      let data = atob(this.cookieService.get('username')).split('+');
      this.loginForm.controls['email'].setValue(data[0]);
      this.loginForm.controls['password'].setValue(atob(data[1]))
    } else {
      this.loginForm.controls['remember_me'].setValue(false)
    }
  }

  get emailControl(): UntypedFormControl {
    return this.loginForm.get('email') as UntypedFormControl;
  }

  get passwordControl(): UntypedFormControl {
    return this.loginForm.get('password') as UntypedFormControl;
  }

  openSnackBar(message: string, action: string, cssClass: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: cssClass,
      duration: 4000,
    });
  }

  enableTwoFactorAuthentication(obj: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.maxHeight = 'auto';
    dialogConfig.data = obj;
    dialogConfig.panelClass = 'bg-image'

    const dialogRef = this.dialog.open(TwoFactorAuthenticationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      if(result.event === 'enable-mfa') {
        this.commonLogin(result.data)
      } else {
        this.openSnackBar(result.message, '', 'mat-snack-bar-danger');
      }
    })
  }

  twoFactorAuthenticationDialog(obj: any) {
    const dialogConfig = new MatDialogConfig();
        // console.log(action);

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.maxHeight = 'auto'
    dialogConfig.data = obj;
    dialogConfig.panelClass = 'bg-image'

    const dialogRef = this.dialog.open(TwoFactorAuthDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result.event === 'verify-totp') {
        // this.validateOTP = 'Please wait while we verify your OTP.';
       this.commonLogin(result.data)
      }
    })
  }

  onSubmit() {
    this.isSubmitted = true;

    //stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const payload = {
      email: this.loginForm.controls['email'].value,
      password: btoa(this.loginForm.controls['password'].value),
      provider: 'local',
      mfaCode: '', // if needed, you can fetch this from a control or input
      rememberMe: this.isCheckboxChecked
    };
  
    // * Dispatch the action for normal login
    this.store.dispatch(login(payload));
  }

  commonLogin(payload: any) {
    // this.authService.login(payload.username, payload.password, payload.provider, payload.totp, this.isCheckboxChecked).subscribe((data: any) => {
    //   if(data.body.status === 'success') {
    //     this.openSnackBar('You successfully logged in!', '', 'mat-snack-bar-success');
    //     this.router.navigate(['/dashboard/home']);
    //   } else {
    //     // console.log(data)
    //     if(data.body.status === 'failed' && data.body.results.length === 0) {
    //       this.openSnackBar(data.body.message, '', 'mat-snack-bar-danger');
    //     }
    //     if(data.body.status === 'failed' && data.body.results[0].mfa_status === 'enabled' && data.body.results[0].mfa_state === 'unenrolled') {
    //       // console.log("Enabled... UnEnrolled....")
    //       let result = {
    //         username: this.loginForm.controls['email'].value,
    //         password: btoa(this.loginForm.controls['password'].value),
    //         mfa: data.body.results[0],
    //         message: data.body.message
    //       }
    //       this.enableTwoFactorAuthentication(result);
    //     }
    //     if(data.body.status === 'failed' && data.body.results[0].mfa_status === 'enabled' && data.body.results[0].mfa_state === 'enrolled') {
    //       // console.log("Enabled... Enrolled....")
    //       if(data.body.message === '2FA Enrollment successful. Please login again.') {
    //         this.openSnackBar(data.body.message, '', 'mat-snack-bar-success');
    //       }
          
    //       let result = {
    //         username: this.loginForm.controls['email'].value,
    //         password: btoa(this.loginForm.controls['password'].value),
    //       }
    //       this.twoFactorAuthenticationDialog(result);
    //     }
    //   }
    // }, (error: any) => {
    //   this.openSnackBar('The email or password is incorrect!', '', 'mat-snack-bar-danger');
    // });
  }

  navigateTo(): void {
    this.router.navigate(['/signup'])
  }
}
