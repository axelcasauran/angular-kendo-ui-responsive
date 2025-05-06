import { Injectable, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogCloseResult, DialogRef, DialogService, WindowService, WindowSettings } from '@progress/kendo-angular-dialog';

import { SearchComponent } from "../components/search/search.component";
import { WindowConfiguration } from 'src/app/framework/interface/window.configuration';
import { SingleGridConfiguration } from 'src/app/framework/interface/singlegrid.configuration';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  @ViewChild("container", { read: ViewContainerRef })
  public containerRef: ViewContainerRef | undefined;

  constructor(private windowService: WindowService, private dialogService: DialogService) { }

  public isMobile() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
  }

  public configureForMobile(sender: any) {
    sender.pageSize = 100;
    sender.windowState = 'maximized';

    var _dom = document.getElementsByClassName('k-window-actions');
    if(_dom.length > 0) {
      _dom[_dom.length - 1].children[2]['hidden'] = true;
    }

    return sender;
  }

  public openWindow(window: WindowConfiguration) {
    var me = this;
    const _windowRef =  me.windowService.open({
                          appendTo: me.containerRef,
                          title: window.window.title,
                          content: window.window.window,
                          height: window.window.height, // depends on screen design
                          width: window.window.width, // depends on screen design
                          resizable: window.window.resizable, // depends on screen design
                          state: me.isMobile() ? "maximized" : "default", // mobile responsive,
                        });
    _windowRef['windowconfig'] = window;
    _windowRef['common'] = me;
    const _window = _windowRef.content.instance;
    window.configuration.isMobile = me.isMobile();
    _window.windowConfig = window;

    setTimeout(function(){_windowRef.window.instance.bringToFront();},100);
  }

  public openSearchWindow(window: WindowConfiguration) {
    var me = this;
    if(window) {
      const _windowRef = me.windowService.open({
        appendTo: me.containerRef,
        title: window.search.title,
        content: SearchComponent,
        height: window.search.height, // depends on screen design
        width: window.search.width, // depends on screen design
        resizable: window.window.resizable, // depends on screen design
        state: me.isMobile() ? "maximized" : "default", // mobile responsive
      });
      const _search = _windowRef.content.instance;
      window.configuration.isMobile = me.isMobile();
      _search.windowConfig = window;

      setTimeout(function(){_windowRef.window.instance.bringToFront();},100);
    }
    else {
      // REOPEN SEARCH
    }
  }

  public openSingleGridWindow(window: SingleGridConfiguration) {
    var me = this;
    const _windowRef =  me.windowService.open({
                          appendTo: me.containerRef,
                          title: window.window.title,
                          content: window.window.window,
                          height: window.window.height, // depends on screen design
                          width: window.window.width, // depends on screen design
                          resizable: true, // depends on screen design
                          state: me.isMobile() ? "maximized" : "default", // mobile responsive
                        });
    const _window = _windowRef.content.instance;
    window.configuration.isMobile = me.isMobile();
    _window.windowConfig = window;

    setTimeout(function(){_windowRef.window.instance.bringToFront();},100);
  }

  public showDialog(title?: string, content?: string, button1: string = "Yes", button2: string = "No", button3: string = "Cancel") {
    var me = this;
    return me.dialogService.open({
      title: title,
      content: content,
      actions: [{ text: button1, themeColor: "primary" }, { text: button2 }, { text: button3 }],
      width: 350,
      height: 150,
      minWidth: 250,
      cssClass: "dialog-css-class",
    });
  }
}
