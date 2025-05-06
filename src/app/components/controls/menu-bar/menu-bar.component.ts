import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogRef, WindowRef } from '@progress/kendo-angular-dialog';

import { CommonService } from "src/app/services/common.service";
import { WindowConfiguration } from 'src/app/framework/interface/window.configuration';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  @Input() public windowConfig: WindowConfiguration;

  constructor(public window : WindowRef, public common: CommonService) { }

  ngOnInit(): void {
  }

  onNew() {
    var me = this;
    if(me.windowConfig.master.form.dirty || me.windowConfig.master.param == "0" || me.windowConfig.components.navigator.recordStatus == "Edited") {
      const _dialog: DialogRef = me.common.showDialog(undefined,"Do you want to save the changes you made?");
      _dialog.result.subscribe((result) => {
        if(result['text'] == "Yes") {
          // SAVE HERE
        }
        else if(result['text'] == "No") {
          me.createNewRecord();
        }
      });
    } else {
      me.createNewRecord();
    }
  }

  onSearch() {
    var me = this;
    if(me.windowConfig.master.form.dirty) {
      const _dialog: DialogRef = me.common.showDialog(undefined,"Do you want to save the changes you made?");
      _dialog.result.subscribe((result) => {
        if(result['text'] == "Yes") {
          // SAVE HERE
        }
        else if(result['text'] == "No") {
          me.openSearch();
        }
      });
    } else {
      me.openSearch();
    }
  }

  onUndo(){
    var me = this;
    me.windowConfig.components.navigator.setRecord();
    me.windowConfig.details.forEach((x:any)=>{
      if(x.grid) {
        x.grid.undoChanges();
      }
    });
  }

  onDelete() {
    var me = this;
    const _dialog: DialogRef = me.common.showDialog(undefined,"Are you sure you want to delete this record?");
    _dialog.result.subscribe((result) => {
      if(result['text'] == "Yes") {
        // DELETE API
        var _index = me.windowConfig.window.recordSelected.indexOf(me.windowConfig.master.param);
        me.windowConfig.window.recordSelected.splice(_index,1);
        if(me.windowConfig.window.recordSelected.length > _index-1) {
          me.windowConfig.master.param =  me.windowConfig.window.recordSelected[_index-1];
          me.windowConfig.components.navigator.setTotal(me.windowConfig.window.recordSelected.length);
          me.windowConfig.components.navigator.refresh();
        }
        if(me.windowConfig.window.recordSelected.length == 0) {
          me.window.close();
        }
      }
      else if(result['text'] == "No") {
      }
    });
  }

  onClose() {
    var me = this;
    if(me.windowConfig.master.form.dirty) {
      const _dialog: DialogRef = me.common.showDialog(undefined,"Do you want to save the changes you made?");
      _dialog.result.subscribe((result) => {
        if(result['text'] == "Yes") {
          // SAVE HERE
        }
        else if(result['text'] == "No") {
          me.window.close();
        }
      });
    } else {
      me.window.close();
    }
  }

  createNewRecord() {
    var me = this;

    if(me.windowConfig.master.param == "0") {

    } else {
      me.windowConfig.master.param = "0";
      me.windowConfig.window.recordSelected.unshift(0);
      me.windowConfig.components.navigator.setTotal(me.windowConfig.window.recordSelected.length, 0);
    }

    Object.keys(me.windowConfig.master.form.controls).forEach(function eachKey(key) {
      me.windowConfig.master.form.controls[key].reset();
    });
    me.windowConfig.master.loading = false;
    me.windowConfig.details.forEach((grid:any)=>{
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

  openSearch() {
    var me = this;
    me.windowConfig.configuration.fromExistingWindow = true;
    me.common.openSearchWindow(me.windowConfig);
  }

  bringtoFront() {
    var me = this;
    me.window.window.instance.bringToFront()
  }

}
