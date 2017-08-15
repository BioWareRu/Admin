import { Component, Input } from '@angular/core';
import { FormInput } from './FormInput';
@Component({
  selector: 'drop-down-input',
  templateUrl: './DropDownInputComponent.html'
})
export class DropDownInputComponent extends FormInput {
  @Input() public OptGroups: any;
}
