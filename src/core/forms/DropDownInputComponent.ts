import {Component, Input} from '@angular/core';
import {FormInput} from './FormInput';

@Component({
    selector: 'drop-down-input',
    templateUrl: './DropDownInputComponent.html'
})
export class DropDownInputComponent extends FormInput {
    @Input() public OptGroups: any;
    @Input() public Comparator: any;


    public compareModels(o1: any, o2: any) {
        if (this.Comparator) {
            return this.Comparator(o1, o2);
        }
        return o1 === o2;
    }

}
