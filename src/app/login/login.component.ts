import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  isSubmitted: Boolean = false;

  @ViewChild('updateLoginForm')  updateLoginForm: NgForm;
  
  imagesContainer: any = [
    {
      imageSrcUrl: '../../assets/login-first.svg',
      imageAlt: 'Login First'
    },
    {
      imageSrcUrl: '../../assets/login-second.svg',
      imageAlt: 'Login Second'
    },
    {
      imageSrcUrl: '../../assets/login-third.svg',
      imageAlt: 'Login Third'
    }
  ];

  selectedIndex: number = 0;
  indicator: boolean = true;
  controls: boolean = true;
  autoSlide: boolean = true;
  slideDuration: number = 3000;//Default to 3 seconds

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if(this.autoSlide) {
      this.autoSlideImages();
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8), this.passwordWithNoSpace]]
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
    if(this.loginForm.invalid) {
      return;
    } 
    let payload = {
      "email": this.loginForm.controls['email'].value,
      "password": btoa(this.loginForm.controls['password'].value)
    }
    // this.authService.onLogin(payload).subscribe((data) => {
    //   console.log(data)
    //   sessionStorage.setItem('token' , data.token)
    //   this.updateLoginForm.resetForm({})
    //   this._router.navigate(['/dashboard'])
    // })
    this.updateLoginForm.resetForm({})
  }
}
