import { Component, Input, OnInit } from '@angular/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { WindowConfiguration } from 'src/app/framework/interface/window.configuration';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html'
})
export class CurrencyComponent implements OnInit {
  @Input() public windowConfig: WindowConfiguration;

  constructor(public window : WindowRef) { }

  ngOnInit() {
    var me = this;
    me.controlSetup();
  }

  public controlSetup() {
      var me = this;
      me.windowConfig.components.window = me;
  }

}
