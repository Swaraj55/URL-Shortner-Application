import { Component, OnInit, ViewChildren, QueryList, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-custom-otp-input',
  templateUrl: './custom-otp-input.component.html',
  styleUrls: ['./custom-otp-input.component.scss']
})
export class CustomOtpInputComponent implements OnInit {
    @ViewChildren('otpInput', { read: ElementRef }) otpInputs: QueryList<ElementRef>;
    @Output() otpChange = new EventEmitter<string>();
    @Output() allFieldsFilled = new EventEmitter<boolean>();
    otpControls: Array<any> = new Array(6).fill(null);
  
    constructor() {}
  
    ngOnInit(): void {}
  
    onInput(event: Event): void {
      const input = event.target as HTMLInputElement;
      const index = Number(input.getAttribute('data-index'));
  
      if (input.value.length > 0) {
        input.classList.remove('invalid');
        if (index < this.otpControls.length - 1) {
          this.otpInputs.toArray()[index + 1].nativeElement.focus();
        }
      }
  
      this.updateOtpValue();
    }
  
    onKeyDown(event: KeyboardEvent): void {
      const input = event.target as HTMLInputElement;
      const index = Number(input.getAttribute('data-index'));
  
      if (event.key === 'Backspace' && !input.value && index > 0) {
        this.otpInputs.toArray()[index - 1].nativeElement.focus();
      }
    }

  onPaste(event: ClipboardEvent): void {
    const pasteData = event.clipboardData?.getData('text').trim();
    if (pasteData && pasteData.length === this.otpControls.length) {
      this.otpControls.forEach((_, index) => {
        const input = this.otpInputs.toArray()[index].nativeElement;
        input.value = pasteData[index];
        input.classList.remove('invalid');
      });
      this.updateOtpValue();
      // Focus on the next input after the last filled input
      const lastIndex = this.otpControls.length - 1;
      this.otpInputs.toArray()[lastIndex].nativeElement.focus();
    }
    event.preventDefault();
  }

  updateOtpValue(): void {
    const otpValue = this.otpInputs.toArray().map(input => input.nativeElement.value).join('');
    console.log('OTP Value:', otpValue); // Handle the OTP value as needed
    this.otpChange.emit(otpValue); // Emit the OTP value
    this.allFieldsFilled.emit(otpValue.length === this.otpControls.length);
  }

  markFieldsInvalid(): void {
    this.otpInputs.forEach(input => {
      if (!input.nativeElement.value) {
        input.nativeElement.classList.add('invalid');
      }
    });
  }
}
