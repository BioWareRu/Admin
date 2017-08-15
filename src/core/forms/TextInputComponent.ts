import {Component, Input} from '@angular/core';
import {FormInput} from './FormInput';

@Component({
  selector: 'text-input',
  templateUrl: './TextInputComponent.html',
  /*providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextInputComponent), multi: true},
  ]*/
})
export class TextInputComponent extends FormInput {
  @Input() public Type: string = 'text';
}
