import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../@url-shortner/services/authentication.service';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { TwoFactorAuthenticationDialogComponent } from './two-factor-authentication-dialog/two-factor-authentication-dialog.component';
import { TwoFactorAuthDialogComponent } from './two-factor-auth-dialog/two-factor-auth-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../theme.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  isSubmitted: Boolean = false;

  @ViewChild('updateLoginForm') updateLoginForm: NgForm;

  imagesContainer: any = [
    {
      imageSrcUrl: '../../assets/login-first.svg',
      imageAlt: 'Login First',
    },
    {
      imageSrcUrl: '../../assets/login-second.svg',
      imageAlt: 'Login Second',
    },
    {
      imageSrcUrl: '../../assets/login-third.svg',
      imageAlt: 'Login Third',
    },
  ];

  selectedIndex: number = 0;
  indicator: boolean = true;
  controls: boolean = true;
  autoSlide: boolean = true;
  slideDuration: number = 3000; //Default to 3 seconds

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }

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

  //changes slide in every 3 seconds
  autoSlideImages() {
    setInterval(() => {
      this.onNextClick();
    }, this.slideDuration);
  }

  //set index of images on dot/indicator click
  selectImage(index: number) {
    this.selectedIndex = index;
  }

  onNextClick() {
    if (this.selectedIndex === this.imagesContainer.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
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
    dialogConfig.width = '75%';
    dialogConfig.height = '600px';
    dialogConfig.maxWidth = '400px';
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
    dialogConfig.width = '75%';
    dialogConfig.maxWidth = '500px';
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
    // console.log("From Common Login..", payload)
    this.authService.login(payload.username, payload.password, payload.totp).subscribe((data: any) => {
      if(data.body.status === 'success') {
        this.openSnackBar('You successfully logged in!', '', 'mat-snack-bar-success');
        this.router.navigate(['/dashboard/home']);
        // console.log(data)
        //this.updateLoginForm.resetForm({});
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
}
