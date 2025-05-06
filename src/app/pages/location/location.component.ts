import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { WindowRef } from '@progress/kendo-angular-dialog';
import { WindowConfiguration } from 'src/app/framework/interface/window.configuration';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit {
  @Input() public windowConfig: WindowConfiguration;

  public formGroup: FormGroup = new FormGroup({});
  public isLoading: boolean = true;

  constructor(public window : WindowRef) { }

  ngOnInit() {
    var me = this;
    me.controlSetup();
}

public controlSetup() {
    var me = this;
    me.formGroup = me.windowConfig.master.form;
    me.windowConfig.components.window = me;
    me.isLoading = me.windowConfig.window.loading.isLoading;
}

}
