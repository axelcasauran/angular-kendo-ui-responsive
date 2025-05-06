import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { fields, WindowConfiguration } from "../../../framework/interface/window.configuration";

@Component({
  selector: 'formfield-textbox',
  templateUrl: './formfield-textbox.component.html',
  styleUrls: ['./formfield-textbox.component.scss']
})
export class FormfieldTextboxComponent implements OnInit {
  @Input() public model: fields;
  @Input() public formGroup = new FormGroup({});

  field: string = "";
  labelText: string = "";
  labelWidth: number = 90;
  textboxWidth: number = 210;
  isHidden: boolean = false;
  isRequired: boolean = false;
  windowParent = new WindowRef;
  paddingRight: number = 10;
  validationMessage: string = "";

  constructor(public window : WindowRef) { }

  ngOnInit(): void {
    var me = this;
    me.field = me.model.field;
    me.labelText = me.model.title;
    me.labelWidth = me.model.width;
    me.isHidden = me.model.hidden;
    me.isRequired = me.model.required;

    me.formGroup.valueChanges.subscribe( (x) => {
      if(me.formGroup.controls[me.field]) {
        if(me.formGroup.controls[me.field].errors) {
          var _errors = me.formGroup.controls[me.field].errors || '';
          Object.keys(_errors).forEach(keys=>{
            console.log(keys);
            if(keys == 'required') {
              me.validationMessage = me.labelText + ' is ' + keys;
              return true;
            }
            else if(keys == 'minlength') {
              me.validationMessage = me.labelText + ' is required atleast ' + _errors[keys].requiredLength + ' characters';
              return true;
            }
            me.validationMessage = "";
            return true;
          });
        }
        else {
          me.validationMessage = "";
          return true;
        }
      }
      else {
        me.validationMessage = "";
      }
      return true;
    });
  }

  bringtoFront() {
    var me = this;
    me.window.window.instance.bringToFront()
  }

}
