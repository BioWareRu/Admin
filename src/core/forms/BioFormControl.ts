import {FormControl, ValidationErrors} from '@angular/forms';

export class BioFormControl extends FormControl {
  public ServerErrors: string[] = [];

  static serverErrors(control: BioFormControl): ValidationErrors | null {
    return control.ServerErrors && control.ServerErrors.length > 0 ? {'serverErrors': true} : null;
  }
}
