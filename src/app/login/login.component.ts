import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../@url-shortner/services/authentication.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TwoFactorAuthenticationDialogComponent } from './two-factor-authentication-dialog/two-factor-authentication-dialog.component';
import { TwoFactorAuthDialogComponent } from './two-factor-auth-dialog/two-factor-auth-dialog.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../theme.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup = new UntypedFormGroup({});
  isSubmitted: Boolean = false;

  @ViewChild('updateLoginForm') updateLoginForm: NgForm;
  isCheckboxChecked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private cookieService: CookieService,
    ) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordWithNoSpace,
          ],
        ],
        remember_me: [false]
      });
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

  passwordWithNoSpace(control: AbstractControl) {
    if (control.value) {
      if ((control.value as string).indexOf(' ') >= 0) {
        return { noSpace: true };
      }
      return null;
    }
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
    let payload = {
      username: this.loginForm.controls['email'].value,
      password: btoa(this.loginForm.controls['password'].value),
    };
    this.commonLogin(payload)
  }

  commonLogin(payload: any) {
    this.authService.login(payload.username, payload.password, payload.totp, this.isCheckboxChecked).subscribe((data: any) => {
      if(data.body.status === 'success') {
        this.openSnackBar('You successfully logged in!', '', 'mat-snack-bar-success');
        this.router.navigate(['/dashboard/home']);
      } else {
        // console.log(data)
        if(data.body.status === 'failed' && data.body.results.length === 0) {
          this.openSnackBar(data.body.message, '', 'mat-snack-bar-danger');
        }
        if(data.body.status === 'failed' && data.body.results[0].mfa_status === 'enabled' && data.body.results[0].mfa_state === 'unenrolled') {
          // console.log("Enabled... UnEnrolled....")
          let result = {
            username: this.loginForm.controls['email'].value,
            password: btoa(this.loginForm.controls['password'].value),
            mfa: data.body.results[0],
            message: data.body.message
          }
          this.enableTwoFactorAuthentication(result);
        }
        if(data.body.status === 'failed' && data.body.results[0].mfa_status === 'enabled' && data.body.results[0].mfa_state === 'enrolled') {
          // console.log("Enabled... Enrolled....")
          if(data.body.message === '2FA Enrollment successful. Please login again.') {
            this.openSnackBar(data.body.message, '', 'mat-snack-bar-success');
          }
          
          let result = {
            username: this.loginForm.controls['email'].value,
            password: btoa(this.loginForm.controls['password'].value),
          }
          this.twoFactorAuthenticationDialog(result);
        }
      }
    }, (error: any) => {
      this.openSnackBar('The email or password is incorrect!', '', 'mat-snack-bar-danger');
    });
  }

  navigateTo(): void {
    this.router.navigate(['/signup'])
  }
}
