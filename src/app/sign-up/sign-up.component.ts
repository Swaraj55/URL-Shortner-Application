import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
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
  ) { }

  ngOnInit(): void {
    if(this.autoSlide) {
      this.autoSlideImages();
    }

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8), this.passwordWithNoSpace]],
      confirmPassword: ['',[Validators.required, Validators.minLength(8), this.passwordWithNoSpace]]
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


  onSubmit() {
    this.isSubmitted = true;

    //stop here if form is invalid
    if(this.signupForm.invalid) {
      return;
    } 
    let payload = {
      "email": this.signupForm.controls['email'].value,
      "password": btoa(this.signupForm.controls['password'].value)
    }
    // this.authService.onLogin(payload).subscribe((data) => {
    //   console.log(data)
    //   sessionStorage.setItem('token' , data.token)
    //   this.updateLoginForm.resetForm({})
    //   this._router.navigate(['/dashboard'])
    // })
    this.updateSignupForm.resetForm({})
  }
}
