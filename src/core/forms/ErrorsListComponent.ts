import {Component, Input} from '@angular/core';
import {BioFormControl} from './BioFormControl';

@Component({
  selector: 'errorsList',
  template: `
    <div [hidden]="Control.valid && !Control.ServerErrors">
      <div *ngIf="Control.errors">
        <div *ngIf="Control.errors['required']" class="control-error">
          Поле обязательно для заполнения
        </div>
        <div *ngIf="Control.errors['url']" class="control-error">
          Значение должно являться корректным URL
        </div>
      </div>
      <div>
        <div *ngFor="let e of Control.ServerErrors" class="control-error">
          {{e}}
        </div>
      </div>
    </div>
  `
})
export class ErrorsListComponent {
  @Input() public Control: BioFormControl;
}
