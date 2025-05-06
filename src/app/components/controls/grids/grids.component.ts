import { Observable } from "rxjs";
import { Component, Input, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { GridSize } from "@progress/kendo-angular-grid";

import {
  AddEvent,
  GridDataResult,
  CellClickEvent,
  CellCloseEvent,
  SaveEvent,
  CancelEvent,
  GridComponent,
  RemoveEvent,
  SelectableSettings,
  CreateFormGroupArgs,
  RowArgs,
} from "@progress/kendo-angular-grid";
import { State, process, CompositeFilterDescriptor } from "@progress/kendo-data-query";

import { Keys } from "@progress/kendo-angular-common";

import { map } from "rxjs/operators";
import { EditGridService } from "src/app/services/edit.grid.service";
import { WindowConfiguration } from "src/app/framework/interface/window.configuration";
import { CustomMessagesService } from "src/app/services/custom-messages.service";
import { MessageService } from "@progress/kendo-angular-l10n";
import { WindowRef } from "@progress/kendo-angular-dialog";
import { DataService } from "src/app/services/data.service";

import { title } from "src/app/framework/models/categories.model"; // to remove
import { Title } from "src/app/framework/models/mock/model"; // to remove

@Component({
  selector: 'grids',
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.scss']
})
export class GridsComponent implements OnInit {
  @Input() public windowConfig: WindowConfiguration;
  @Input() public gridNumber: number;

  public grid: GridComponent;
  public selectableSettings: SelectableSettings;
  public buttonsEnabler = false;
  public smallSize: GridSize = "small";

  public editedRowIndex: number = -1;
  public isLoading: boolean = false;

  public customMsgService: CustomMessagesService;

  //testing
  // public titles: Title[] = title;

  constructor(
    private formBuilder: FormBuilder,
    public editService: EditGridService,
    public msgService: MessageService,
    public window : WindowRef,
    private service: DataService
  ) {
    this.customMsgService = this.msgService as CustomMessagesService;
    this.selectableSettings = {
      checkboxOnly: true,
      mode: "multiple",
      drag: false,
    };
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public ngOnInit(): void {
    var me = this;

    if(!me.windowConfig.details[me.gridNumber].grid) {
      me.windowConfig.details[me.gridNumber].grid = me;
      me.setup();
    }
    else {
      me.windowConfig.details[me.gridNumber].buttons.add = false;
      me.windowConfig.details[me.gridNumber].buttons.remove = false;
    }
  }



  // public save(product: any, isNew: boolean): void {
  //   var me = this;
  //   // if (isNew) {
  //   //   product.ProductID = me.gridView.length + 1;
  //   //   // update the the Grid's data array
  //   //   Object.assign(me.gridView[me.gridView.length - 1], product)
  //   // } else {
  //   //   Object.assign(
  //   //     me.gridView.find(({ ProductID }) => ProductID === product.ProductID),
  //   //     product
  //   //   );
  //   // }
  // }


  // public cellClickHandler({ isEdited, dataItem, rowIndex }): void {
  //   if (isEdited || (this.formGroup && !this.formGroup.valid)) {
  //     return;
  //   }

  //   this.saveRow();

  //   // this.formGroup = createFormGroup(dataItem);
  //   this.editedRowIndex = rowIndex;

  //   this.grid.editRow(rowIndex, this.formGroup);
  // }



  // public addHandler(args: AddEvent): void {
  //   var me = this;
  //   console.log(args);
  //   args.sender.addRow(me.windowConfig.details[me.gridNumber].form);
  // }

  // public cancelHandler(args: CancelEvent): void {
  //   args.sender.closeRow(args.rowIndex);
  // }

  // public removeHandler(args: RemoveEvent): void {
  //   console.log(args.dataItem);
  //   this.editService.remove(args.dataItem);

  //   args.sender.cancelCell();
  // }

  // public saveHandler(args: SaveEvent, gridNumber: number): void {
  //   var me = this;
  //   if (args.formGroup.valid) {
  //     me.windowConfig.details[gridNumber].bind.push(args.formGroup.value);
  //     args.sender.closeRow(args.rowIndex);
  //   }
  // }


  // public cellCloseHandler(args: CellCloseEvent, grid: GridComponent, gridNumber: number): void {
  //   var me = this;
  //   const { formGroup, dataItem } = args;

  //   if (!formGroup.valid) {
  //     args.preventDefault();
  //   }
  //   else if (formGroup.dirty) {
  //     if (args.originalEvent && args.originalEvent.keyCode === Keys.Escape) {
  //       return;
  //     }
  //     if(me.isNew == true) {
  //       me.saveRow(grid, gridNumber);
  //     }
  //     else {
  //       me.assignValues(dataItem, formGroup.value);
  //     }
  //     me.formGroup.reset();
  //   }
  // }







  // public saveChanges(grid: GridComponent): void {
  //   grid.closeCell();
  //   grid.cancelCell();

  //   this.editService.saveChanges();
  // }

  // public cancelChanges(grid: GridComponent): void {
  //   grid.cancelCell();

  //   this.editService.cancelChanges();
  // }

  // public createFormGroupX(dataItem: Product): FormGroup {
  //   return this.formBuilder.group({
  //     ProductID: dataItem.ProductID,
  //     ProductName: [dataItem.ProductName, Validators.required],
  //     UnitPrice: dataItem.UnitPrice,
  //     UnitsInStock: [
  //       dataItem.UnitsInStock,
  //       Validators.compose([
  //         Validators.required,
  //         Validators.pattern("^[0-9]{1,3}"),
  //       ]),
  //     ],
  //     QuantityPerUnit: dataItem.QuantityPerUnit,
  //     Discontinued: dataItem.Discontinued,
  //   });
  // }



  //#region CORE Functions

  public setup(index: any = null) {
    var me = this;
    var _url = me.windowConfig.details[index || me.gridNumber].api.replace('x', me.windowConfig.details[index || me.gridNumber].param); // change primary key value
    me.isLoading = true;
    me.service.get(_url).subscribe((data)=>{
      console.log(data);
      const _data = data;
      me.isLoading = false;
      me.windowConfig.details[me.gridNumber].loading = false;
      me.windowConfig.details[me.gridNumber].data = JSON.stringify(_data);
      me.windowConfig.details[me.gridNumber].bind = _data;
      me.windowConfig.details[me.gridNumber].formBind = FormGroup;
      me.windowConfig.details[me.gridNumber].filter = '';
      me.windowConfig.details[me.gridNumber].buttons.add = false;
      me.windowConfig.details[me.gridNumber].buttons.remove = false;
      me.windowConfig.details[me.gridNumber].config.isNew = false;
      me.windowConfig.details[me.gridNumber].selected = [];

      me.windowConfig.details[me.gridNumber].columns.forEach((x: any)=>{
        if(x.combobox) {
          console.log(x.combobox.valueField);

          if(x.combobox.api != "") {
            var _url = x.combobox.api.replace('x', me.windowConfig.details[me.gridNumber].param);
            me.service.get(_url).subscribe((data)=>{
              x.combobox.bind = data;
              x.combobox.data = data;
            });
          }
          // else {
          //   x.combobox.bind = me.windowConfig.details[me.gridNumber].columns[x]; // to change
          //   x.combobox.data = me.titles; // to change
          // }

        }
      });
      me.windowConfig.window.loading.checkLoading(me.windowConfig, me.gridNumber);
    });
  }

  public undoChanges() {
    var me = this;
    const _data = JSON.parse(me.windowConfig.details[me.gridNumber].data);
    me.windowConfig.details[me.gridNumber].bind = _data;
    me.windowConfig.details[me.gridNumber].formBind = FormGroup;
    me.windowConfig.details[me.gridNumber].filter = '';
    me.windowConfig.details[me.gridNumber].config.isNew = false;
    me.windowConfig.details[me.gridNumber].buttons.add = false;
    me.windowConfig.details[me.gridNumber].buttons.remove = false;
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    var me = this;
    const item = args.isNew ? me.windowConfig.details[me.gridNumber].form : args.dataItem;

    me.windowConfig.details[me.gridNumber].formBind = me.windowConfig.details[me.gridNumber].createForm(item);
    me.editedRowIndex = args.rowIndex;
    me.windowConfig.details[me.gridNumber].selected = [];
    me.windowConfig.details[me.gridNumber].selected.push(args.dataItem[me.windowConfig.details[me.gridNumber].key]);

    return me.windowConfig.details[me.gridNumber].formBind;
  }

  //#endregion

  //#region "CRUD"

  public addRow(grid: GridComponent, gridNumber: number) {
    var me = this;

    me.grid = grid;
    if(me.windowConfig.details[gridNumber].formBind) {
      if(!me.windowConfig.details[gridNumber].formBind.valid && me.windowConfig.details[gridNumber].formBind.touched == true) {
        return;
      }
    }

    if(me.windowConfig.details[gridNumber].config.isNew == true && me.windowConfig.details[gridNumber].bind.length > 0) {
      me.saveRow(grid, gridNumber);
    }
    if(me.editedRowIndex >= 0) {
      grid.closeCell();
      grid.closeRow(me.editedRowIndex);
    }

    grid.closeRow();
    me.windowConfig.details[gridNumber].formBind = me.windowConfig.details[gridNumber].form;
    me.windowConfig.details[gridNumber].formBind.reset();

    // ADD DEFAULT DATA
    me.windowConfig.details[gridNumber].formBind.controls[me.windowConfig.details[gridNumber].key].setValue(Math.random());
    me.windowConfig.details[gridNumber].formBind.controls['_rowstate'].setValue('new');
    me.windowConfig.details[gridNumber].columns.forEach((x: any) => {
      if(x.combobox) {
        if(x.combobox.default) {
          Object.keys(x.combobox.default).forEach((z: any) => {
            me.windowConfig.details[gridNumber].formBind.controls[z].setValue(x.combobox.default[z]);
          });
        }
      }
    });

    me.windowConfig.details[gridNumber].bind.push(me.windowConfig.details[gridNumber].formBind.value);
    grid.editCell(me.windowConfig.details[gridNumber].bind.length-1,1,me.windowConfig.details[gridNumber].formBind);
    me.editedRowIndex = me.windowConfig.details[gridNumber].bind.length-1;
    me.windowConfig.details[gridNumber].config.isNew = true;
    me.windowConfig.details[gridNumber].selected = [];
    me.windowConfig.details[gridNumber].selected.push(me.windowConfig.details[gridNumber].formBind.controls[me.windowConfig.details[gridNumber].key].value);

    me.windowConfig.components.navigator.recordStatus = 'Edited';
  }

  public saveRow(grid: GridComponent, gridNumber: number): void {
    var me = this;
    if (me.windowConfig.details[gridNumber].formBind) {
      me.assignValues(me.windowConfig.details[gridNumber].bind[me.windowConfig.details[gridNumber].bind.length-1], me.windowConfig.details[gridNumber].formBind.value);
      grid.closeRow(me.windowConfig.details[gridNumber].bind.length-1);
      me.windowConfig.details[gridNumber].formBind.reset();
      me.windowConfig.details[gridNumber].config.isNew = false;
      me.editedRowIndex = -1;
    }
  }

  public deleteRows(gridNumber: number) {
    var me = this;

    if(me.windowConfig.details[gridNumber].formBind) {
      if(!me.windowConfig.details[gridNumber].formBind.valid && me.windowConfig.details[gridNumber].formBind.touched == true) {
        return;
      }
    }

    me.windowConfig.details[gridNumber].selected.forEach(x=>{
      me.windowConfig.details[gridNumber].bind.forEach((z:any)=>{
        if(z[me.windowConfig.details[gridNumber].key] == x) {
          z._rowstate = 'deleted';
          var _dataIndex = me.windowConfig.details[gridNumber].bind.findIndex((z:any)=>z[me.windowConfig.details[gridNumber].key] == x);
          me.windowConfig.details[gridNumber].bind.splice(_dataIndex,1);
        }
      });
      me.windowConfig.components.navigator.recordStatus = 'Edited';
    });
    me.windowConfig.details[gridNumber].selected = [];
  }

  //#endregion

  //#region "Grid Events"

  public cellClickHandler(args: CellClickEvent, grid: GridComponent, gridNumber: number): void {
    var me = this;
    me.grid = grid;

    if(me.windowConfig.details[gridNumber].formBind) {
      if(!me.windowConfig.details[gridNumber].formBind.valid && me.windowConfig.details[gridNumber].formBind.touched == true) {
        return;
      }
    }
    if(me.windowConfig.details[gridNumber].config.isNew == true) {
      me.saveRow(grid, gridNumber);
    }
    if (!args.isEdited) {
      args.sender.editCell(
        args.rowIndex,
        args.columnIndex,
        me.windowConfig.details[gridNumber].createForm(args.dataItem)
      );
      me.editedRowIndex = args.rowIndex;
      me.windowConfig.details[gridNumber].selected = [];
    }
  }

  public cellCloseEdit(args: CellCloseEvent, grid: GridComponent, gridNumber: number): void {
    var me = this;
    const { formGroup, dataItem } = args;

    console.log(formGroup);
    console.log(dataItem);

    if (!formGroup.valid && me.windowConfig.configuration.skipValidation == false) {
      args.preventDefault();
    }
    else if (me.windowConfig.configuration.skipValidation == true) {
      grid.closeRow(args.rowIndex);
      return;
    }
    else if (formGroup.dirty) {
      if (args.originalEvent && args.originalEvent.keyCode === Keys.Escape) {
        return;
      }
      me.windowConfig.details[gridNumber].config.isNew = false;
      if(dataItem['_rowstate'] != "new") {
        me.windowConfig.details[gridNumber].formBind.controls['_rowstate'].setValue('edited');
      }
      me.windowConfig.components.navigator.setEdited();
    }
  }

  //#endregion

  //#region "Functions"

  public assignValues(target: any, source: any): void {
    Object.assign(target, source);
  }

  public isRowSelected = (e: RowArgs): boolean =>
    this.windowConfig.details[this.gridNumber].selected.indexOf(e.dataItem[this.windowConfig.details[this.gridNumber].key]) >= 0;


  public onFilter(inputValue: string, gridNumber: number): void {
    var me = this;
    var _filters: { field: any; operator: string; value: string; }[] = [];

    me.windowConfig.details[gridNumber].columns.forEach((x: any) => {
      var _entry = {
                      field: x['field'],
                      operator: 'contains',
                      value: inputValue
                    };
    _filters.push(_entry);
    });

    me.windowConfig.details[gridNumber].bind = process(me.windowConfig.details[gridNumber].data, {
        filter: {
            logic: 'or',
            filters: _filters
        }
    }).data;

    if(inputValue.length > 0) {
      me.windowConfig.details[gridNumber].buttons.add = true;
      me.windowConfig.details[gridNumber].buttons.remove = true;
    }
    else {
      me.windowConfig.details[gridNumber].buttons.add = false;
      me.windowConfig.details[gridNumber].buttons.remove = false;
    }
  }

  public filterChange(filter: CompositeFilterDescriptor, gridNumber: number) {
      var me = this;
      if(filter.filters.length > 0) {
        me.windowConfig.details[gridNumber].buttons.add = true;
        me.windowConfig.details[gridNumber].buttons.remove = true;
      }
      else {
        me.windowConfig.details[gridNumber].buttons.add = false;
        me.windowConfig.details[gridNumber].buttons.remove = false;
      }
  }

  public dropdownListFilter(value: string, combo: any) {
    var me = this;
    combo.bind = combo.data.filter(
      (s: any) => s[combo.key].toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  //#endregion





}
