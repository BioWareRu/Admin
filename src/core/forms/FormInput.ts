import {Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {BioFormControl} from "./BioFormControl";

export abstract class FormInput implements OnInit {

  public Control: BioFormControl;

  @Input() public Errors: string[];
  @Input() public FieldName: string;
  @Input() public Label: string;
  @Input() public FormGroup: FormGroup;

  ngOnInit(): void {
    this.Control = <BioFormControl>this.FormGroup.controls[this.FieldName];
  }
}
