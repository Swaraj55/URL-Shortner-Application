import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  ValidationErrors,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    }
  ]
})

export class CustomInputComponent {
  @Input() fieldClass: string;
  @Input() appearance: MatFormFieldAppearance;
  @Input() label: string;
  @Input() inputId: string;
  @Input() type: string;
  @Input() control: UntypedFormControl = new UntypedFormControl();
  @Input() required: boolean = false;
  @Input() icon: string;
  @Input() iconClass: string = 'secondary-text';
  @Input() iconColor: string;
  @Input() placeholder: string;
  @Input() matLabelId: string;

  @Input() errorMessages: { [key: string]: string } = {};
  

  getErrorMessages(): string[] {
    if (!this.control.errors) {
        return [];
    }
  
    return Object.keys(this.control.errors).map(errorKey => this.errorMessages[errorKey]);
  }
}
