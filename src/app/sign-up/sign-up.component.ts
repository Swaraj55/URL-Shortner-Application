import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignUpService } from './sign-up.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../../theme.scss'],
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({});
  isSubmitted: Boolean = false;

  @ViewChild('updateSignupForm')  updateSignupForm: NgForm;
  
  imagesContainer: any = [
    {
      imageSrcUrl: '../../assets/signup-image-1.svg',
      imageAlt: 'Signup First'
    },
    {
      imageSrcUrl: '../../assets/signup-image-2.svg',
      imageAlt: 'Signup Second'
    },
    {
      imageSrcUrl: '../../assets/singup-image-3.svg',
      imageAlt: 'Signup Third'
    },
    { 
      imageSrcUrl: '../../assets/signup-image-4.svg',
      imageAlt: 'Signup Fourth'
    }
  ];

  selectedIndex: number = 0;
  indicator: boolean = true;
  controls: boolean = true;
  autoSlide: boolean = true;
  slideDuration: number = 4000;//Default to 3 seconds

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignUpService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.autoSlide) {
      this.autoSlideImages();
    }

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8), this.passwordWithNoSpace]],
      confirmPassword: ['',[Validators.required, this.passwordWithNoSpace]]
    }, {
      validators: [
        this.comparePassword('password', 'confirmPassword')
      ]
    })
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
    if(this.selectedIndex === this.imagesContainer.length - 1) {
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
        duration: 4000
   });
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

    console.log(payload);
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
}
