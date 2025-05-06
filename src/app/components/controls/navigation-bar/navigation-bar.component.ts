import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogRef, WindowRef } from '@progress/kendo-angular-dialog';
import { PageChangeEvent, PagerType } from '@progress/kendo-angular-pager';

import { CommonService } from "src/app/services/common.service";
import { WindowConfiguration } from 'src/app/framework/interface/window.configuration';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @Input() public windowConfig: WindowConfiguration;

  public pageSize = 1;
  public skip = 0;
  public pagedArticles = [];
  public total = 0;
  public pageSizes = false;
  public info = false;
  public prevNext = true;
  public type: PagerType = "input";
  public recordStatus = 'Ready';
  public refreshLabel: string = "Refresh";

  constructor(public window : WindowRef, public common: CommonService, private service: DataService) { }

  ngOnInit(): void {
    var me = this;
    me.windowConfig.master.form.valueChanges.subscribe( () => {
      if(me.windowConfig.master.form.dirty == true) {
        me.recordStatus = 'Edited';
      }
    });
    me.total = me.windowConfig.window.recordSelected.length;
    me.getRecord();
    me.windowConfig.components.navigator = me;
    if(me.windowConfig.configuration.isMobile == true) me.refreshLabel = "";
  }

  public onPageChange(e: PageChangeEvent): void {
    var me = this;

    if(me.recordStatus == 'Edited') {
      const _dialog: DialogRef = me.common.showDialog(undefined,"Do you want to save the changes you made?");
      _dialog.result.subscribe((result) => {
        if(result['text'] == "Yes") {
          // SAVE HERE
        }
        else if(result['text'] == "No") {
          me.skip = e.skip;
          me.pageSize = e.take;
          me.windowConfig.window.loading.setLoading(me.windowConfig, false);
          me.windowConfig.configuration.skipValidation = true;
          me.clearForm();
          me.getRecord();
          me.getDetails();
        }
      });
    }
    else {
      me.skip = e.skip;
      me.pageSize = e.take;
      me.windowConfig.window.loading.setLoading(me.windowConfig, false);
      me.clearForm();
      me.getRecord();
      me.getDetails();
    }
  }

  clearForm() {
    var me = this;
    if(me.windowConfig.master.param == "0") {
      me.windowConfig.window.recordSelected.splice(0,1);
      me.setTotal(me.windowConfig.window.recordSelected.length);
      me.windowConfig.details.forEach((grid:any)=>{
        if(grid.grid && grid.grid.skipValidation) {
          grid.grid.skipValidation = true;
        }
        grid.data = [];
        grid.bind = [];
        grid.formBind = FormGroup;
        // grid.param = ''; // dont delete
        grid.filter = '';
        grid.selected = [];
        grid.buttons.add = false;
        grid.buttons.remove = false;
        grid.loading = false;
        grid.config.isNew = false;
      });
    }
  }

  getRecord() {
    var me = this;
    me.windowConfig.window.loading.setLoading(me.windowConfig, true);
    var _url = "";
    if(me.windowConfig.window.recordSelected.length > 0) {
      _url = me.windowConfig.master.api.replace('x', me.windowConfig.window.recordSelected[me.skip]);
    }
    else {
      _url = me.windowConfig.master.api.replace('x', me.windowConfig.master.param);
    }
    me.service.get(_url).subscribe((data)=>{
      console.log(data);
      me.windowConfig.master.data = data;
      me.windowConfig.master.param = data[me.windowConfig.master.key];
      me.windowConfig.master.loading = false;
      me.setRecord();
      console.log('getRecord');
      me.windowConfig.window.loading.checkLoading(me.windowConfig, 0);
    });
  }

  setRecord() {
    var me = this;
    Object.keys(me.windowConfig.master.form.controls).forEach(function eachKey(key) {
      me.windowConfig.master.form.controls[key].setValue(me.windowConfig.master.data[key]);
    });
    me.recordStatus = 'Ready';
  }

  getDetails() {
    var me = this;
    var _x = 0;
    me.windowConfig.details.forEach((x:any)=>{
      if(x.grid) {
        if(x.grid.setup) {
          x.grid.setup(_x);
        }
        _x++;
      }
    });
  }

  onRefresh() {
    var me = this;
    if(me.windowConfig.master.form.dirty || me.windowConfig.master.param == "0" || me.windowConfig.components.navigator.recordStatus == "Edited") {
      const _dialog: DialogRef = me.common.showDialog(undefined,"Do you want to save the changes you made?");
      _dialog.result.subscribe((result) => {
        if(result['text'] == "Yes") {
          // SAVE HERE
        }
        else if(result['text'] == "No") {
          me.refresh();
        }
      });
    }
    else {
      me.refresh();
    }
  }

  refresh() {
    var me = this;
    me.getRecord();
    me.getDetails();
  }

  reconfigure() {
    var me = this;
    me.skip = 0;
    me.total = me.windowConfig.window.recordSelected.length;
    me.getRecord();
    me.getDetails();
    me.windowConfig.components.navigator = me;
  }

  setEdited() {
    var me = this;
    me.recordStatus = "Edited";
  }

  setReady() {
    var me = this;
    me.recordStatus = "Ready";
  }

  setTotal(total: number, skip: any = null) {
    var me = this;
    me.total = total;
    if(me.skip > total) {
      me.skip = total;
    }
    if(me.skip == total) {
      me.skip = me.skip - 1;
    }
    if(skip != null) {
      me.skip = skip;
    }
  }

  bringtoFront() {
    var me = this;
    me.window.window.instance.bringToFront()
  }

}
