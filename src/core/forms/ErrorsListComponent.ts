import {Component, Input} from '@angular/core';
import {ValidationErrors} from '@angular/forms';

@Component({
  selector: 'errorsList',
  template: `
    <div *ngIf="Errors.Errors">
      <div *ngFor="let e of Errors.Errors; let i = index" class="control-error" [ngSwitch]="i">
      <span *ngSwitchCase="'required'">
        Поле обязательно для заполнения
      </span>
      </div>
    </div>
    <div *ngIf="Errors.ServerErrors">
      <div *ngFor="let e of Errors.ServerErrors" class="control-error">
        {{e}}
      </div>
    </div>
  `
})
export class ErrorsListComponent {
  @Input() public Errors: ErrorsList;
}

export class ErrorsList {
  public Errors: ValidationErrors;
  public ServerErrors: string[] = [];

  constructor(errors: ValidationErrors, serverErrors: string[]) {
    this.Errors = errors;
    this.ServerErrors = serverErrors;
    console.log(this.Errors, this.ServerErrors);
  }
}
