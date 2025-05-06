import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { DataBindingDirective, DataStateChangeEvent, GridDataResult, PageChangeEvent, PagerPosition, SelectableSettings } from '@progress/kendo-angular-grid';
import { MessageService } from '@progress/kendo-angular-l10n';
import { CompositeFilterDescriptor, process, State } from '@progress/kendo-data-query';
import { WindowRef, WindowService, WindowState } from '@progress/kendo-angular-dialog';
import { PagerType } from '@progress/kendo-angular-pager';

import { WindowConfiguration, fields } from 'src/app/framework/interface/window.configuration';

import { CustomMessagesService } from 'src/app/services/custom-messages.service';
import { CommonService } from "src/app/services/common.service";
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-search-component',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    @ViewChild(DataBindingDirective) dataBinding?: DataBindingDirective;

    @Input() public windowConfig: WindowConfiguration;

    // Translation
    public customMsgService: CustomMessagesService;

    // Grid and Navigation Setup
    public gridView: unknown[];
    public gridData: unknown[];
    public type: PagerType = "numeric";
    public buttonCount = 5;
    public info = false;
    public pageSizes = true;
    public previousNext = true;
    public position: PagerPosition = "bottom";

    public pageSize = 25;
    public skip = 0;
    public pageSizeSettings = [10, 25, 50, 100];

    public exportSettings = [
      {
        text: "Excel",
        icon: "file-pdf",
      },
      {
        text: "PDF",
        icon: "file-excel",
      },
    ];
    public selectableSettings: SelectableSettings = {
      checkboxOnly: true,
      mode: "multiple",
      drag: false,
    };
    public mySelection: number[] = [];
    public columns: fields[];

    // API Request
    public view: Observable<any>;
    public state: State = {
      skip: 0,
      take: 100,
      group: [],
      filter: { filters: [], logic: "and" },
      sort: [],
    };
    public filter: CompositeFilterDescriptor = {
      logic: "and",
      filters: [],
    };
    public loading: boolean = false;
    public data: GridDataResult = { data: [], total: 0 };

    // Mobile Settings
    public windowState: WindowState = 'default';


    constructor(public msgService: MessageService, private common: CommonService, public window : WindowRef, private service: DataService) {
        this.customMsgService = this.msgService as CustomMessagesService;
    }

    public ngOnInit(): void {
      var me = this;
      console.log('IS MOBILE > ', me.windowConfig.configuration.isMobile);
      if(me.windowConfig.configuration.isMobile) {
        me = me.common.configureForMobile(me);
      }

      me.service.BASE_URL = me.windowConfig.search.api;
      me.sendRequest(me.state);

      me.gridData = me.gridView;
      me.columns = me.windowConfig.search.columns;
    }

    public openSelected() {
      var me = this;
      if(me.mySelection.length < 1) return;

      if(me.windowConfig.configuration.fromExistingWindow == true) {
        me.windowConfig.window.recordSelected = me.mySelection;
        me.windowConfig.master.param = me.windowConfig.window.recordSelected[0];
        me.windowConfig.components.navigator.reconfigure();
        me.windowConfig.configuration.fromExistingWindow = false;
        me.window.close();
      }
      else {
        me.windowConfig.window.recordSelected = me.mySelection;
        me.windowConfig.components.search = me;
        me.windowConfig.master.param = me.windowConfig.window.recordSelected[0];
        me.common.openWindow(me.windowConfig);
        me.window.close();
      }
    }

    public onExportClick(): void {
        console.log('test');
    }

    public onFilter(inputValue: string): void {
      var me = this;
      var _filters: { field: any; operator: string; value: string; }[] = [];

      console.log("SEARCH >>> ",inputValue);

      if(inputValue == undefined) {
        me.filter.filters = [];
        me.state.filter = me.filter;
        me.sendRequest(me.state);
      }
      else {
        me.windowConfig.search.columns.forEach((x: any) => {
          var _entry = {
                          field: x['field'],
                          operator: 'contains',
                          value: "1" //inputValue.target?.value
                        };
        _filters.push(_entry);
        });

        console.log(_filters);
        me.filter.filters = _filters;
        me.filter.logic = "or";
        me.state.filter = me.filter;
        me.sendRequest(me.state);
      }
    }

    public dataStateChange(state: DataStateChangeEvent): void {
      this.state = state;
      this.sendRequest(state);
    }

    public sendRequest(state: State): void {
      var me = this;
      me.loading = true;
      me.service.get(me.windowConfig.search.api).subscribe((data) => {
        me.data = {
                      data: data,
                      total: data.length
                  };
        me.loading = false;
      });
    }

}
