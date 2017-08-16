import {Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

export abstract class FormInput implements OnInit {

  private Control: AbstractControl;

  @Input() public Errors: string[];
  @Input() public FieldName: string;
  @Input() public Label: string;
  @Input() public FormGroup: FormGroup;

  ngOnInit(): void {
    this.Control = this.FormGroup.controls[this.FieldName];
  }
}
