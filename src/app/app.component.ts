import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { WindowService } from '@progress/kendo-angular-dialog';
import { MessageService } from '@progress/kendo-angular-l10n';
import { DrawerComponent, DrawerMode, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { CommonService } from './services/common.service';
import { CustomMessagesService } from './services/custom-messages.service';

// import { ProfileConfig } from "./pages/profile-details/profile-details.config.window";
// import { CurrencyConfig } from './pages/currency/currency.window';
// import { LocationConfig } from './pages/location/location.window';
// import { PersonConfig } from './pages/person-management/person/person.window';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'church-management';
  public selected = 'Team';
  public items: Array<any> = [];
  public customMsgService: CustomMessagesService;
  public mode: DrawerMode = 'push';
  public mini = true;

  constructor(private router: Router, public msgService: MessageService, private windowService: WindowService, private common: CommonService) {
        this.customMsgService = this.msgService as CustomMessagesService;
    }

    @ViewChild("container", { read: ViewContainerRef })
    public containerRef: ViewContainerRef | undefined;

    ngOnInit() {
        // // Update Drawer selected state when change router path
        // this.router.events.subscribe((route: any) => {
        //     if (route instanceof NavigationStart) {
        //         this.items = this.drawerItems().map((item) => {
        //             if (item.path && item.path === route.url) {
        //                 item.selected = true;
        //                 return item;
        //             } else {
        //                 item.selected = false;
        //                 return item;
        //             }
        //         });
        //     }
        // });

        // this.setDrawerConfig();

        // this.customMsgService.localeChange.subscribe(() => {
        //     this.items = this.drawerItems();
        // });

        // window.addEventListener('resize', () => {
        //     this.setDrawerConfig();
        // });
    }

    ngOnDestroy() {
        // window.removeEventListener('resize', () => {});
    }

    // public setDrawerConfig() {
    //     const pageWidth = window.innerWidth;
    //     if (pageWidth <= 840) {
    //         this.mode = 'overlay';
    //         this.mini = false;
    //     } else {
    //         this.mode = 'push';
    //         this.mini = true;
    //     }
    // }

//     public drawerItems() {
//         return [
//             { id: 0, text: this.customMsgService.translate('team'), icon: 'k-i-grid', path: '/', selected: true },
//             { id: 1, text: this.customMsgService.translate('dashboard'), icon: 'k-i-chart-line-markers', path: '/dashboard', selected: false },
//             { id: 2, text: "Person", icon: 'k-i-user', path: '/person', selected: false },
//             { id: 3, text: this.customMsgService.translate('profile'), icon: 'k-i-user', path: '/profile', selected: false },
//             { separator: true },
//             { id: 4, text: this.customMsgService.translate('info'), icon: 'k-i-information', path: '/info', selected: false },
//             { separator: true },
//             // { text: this.customMsgService.translate('Window'), icon: 'k-i-information', path: '/window', selected: false },
//             { id: 5, text: 'Master X', icon: 'k-i-information', path: '/master', selected: false },
//             { id: 6, text: 'Master-Detail', icon: 'k-i-information', path: '/search', selected: false },
//             { id: 7, text: 'Single Grid', icon: 'k-i-information', path: '/singlegrid', selected: false },
//             {
//                 text: "Notifications",
//                 icon: "k-i-bell",
//                 id: 9,
//                 parentId: 8,
//               },
//               {
//                 text: "Calendar",
//                 icon: "k-i-calendar",
//                 id: 8,
//               },
//         ];
//     }

//     public toggleDrawer(drawer: DrawerComponent): void {
//         drawer.toggle();
//     }

//     public onSelect(ev: DrawerSelectEvent): void {
//         if(ev.item.path == '/window') {
//             console.log(ev);
//             this.showWindow();
//         }
//         else if(ev.item.path == '/search') {
//             console.log(ev);
//             this.showSearch();
//         }
//         else if(ev.item.path == '/master') {
//             console.log(ev);
//             this.showMaster();
//         }
//         else if(ev.item.path == '/person') {
//             console.log(ev);
//             this.showPerson();
//         }
//         else if(ev.item.path == '/singlegrid') {
//           console.log(ev);
//           this.showSingleGrid();
//       }
//         else {
//             this.router.navigate([ev.item.path]);
//             this.selected = ev.item.text;
//         }
//     }

//     public showPerson(): void {
//       this.common.openSearchWindow(new PersonConfig().PersonConfig);
//   }

//     public showWindow(): void {
//         this.common.openWindow(new ProfileConfig().ProfileConfig);
//     }

//     public showSearch(): void {
//         this.common.openSearchWindow(new ProfileConfig().ProfileConfig);
//     }

//     public showSingleGrid(): void {
//         this.common.openWindow(new CurrencyConfig().CurrencyConfig);
//     }

//     public showMaster(): void {
//         this.common.openSearchWindow(new LocationConfig().LocationConfig);
//     }
}
