import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { EditorModule } from '@progress/kendo-angular-editor';
import { FileSelectModule } from '@progress/kendo-angular-upload';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { MessageService } from '@progress/kendo-angular-l10n';
import { TooltipsModule } from "@progress/kendo-angular-tooltip";
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { PagerModule } from '@progress/kendo-angular-pager';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';

import '@progress/kendo-angular-intl/locales/en/all';
import '@progress/kendo-angular-intl/locales/es/all';
import '@progress/kendo-angular-intl/locales/fr/all';
import 'hammerjs';

import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { FormControllerComponent } from './components/form-controller/form-controller.component';

import { StatusBarComponent } from './components/controls/status-bar/status-bar.component';
import { MenuBarComponent } from './components/controls/menu-bar/menu-bar.component';
import { LoaderComponent } from './components/controls/loader/loader.component';
import { TabstripComponent } from './components/controls/tabstrip/tabstrip.component';
import { NavigationBarComponent } from './components/controls/navigation-bar/navigation-bar.component';
import { FormfieldDatepickerComponent } from './components/controls/formfield-datepicker/formfield-datepicker.component';
import { FormfieldTextboxComponent } from './components/controls/formfield-textbox/formfield-textbox.component';
import { GridsComponent } from './components/controls/grids/grids.component';

// TEMPLATES
import { SingleGridWindow } from './framework/templates/single-grid/single-grid.window';
import { MasterDetailWindow } from './framework/templates/master-detail/master-detail.window';
import { MasterWindow } from './framework/templates/master/master.window';

import { AfterValueChangedDirective } from './framework/directives/after-value-changed.directive';
import { InCellTabDirective  } from './framework/directives/incell-tab-directive';

import { CustomMessagesService } from './services/custom-messages.service';
import { EditGridService } from './services/edit.grid.service';
import { DataService } from './services/data.service';

// SAMPLE
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileDetailsWindow } from './pages/profile-details/profile-details.window';
import { CurrencyComponent } from './pages/currency/currency.component';
import { LocationComponent } from './pages/location/location.component';

// PERSON MANAGEMENT
import { PersonComponent } from './pages/person-management/person/person.component';
import { FormfieldComboboxComponent } from './components/controls/formfield-combobox/formfield-combobox.component';
import { LoginComponent } from './pages/auth/login.component';


@NgModule({
  declarations: [
    AppComponent,
    StatusBarComponent,
    MenuBarComponent,
    LoaderComponent,
    TabstripComponent,
    NavigationBarComponent,
    FormfieldTextboxComponent,
    FormfieldDatepickerComponent,
    FormfieldComboboxComponent,
    GridsComponent,
    AfterValueChangedDirective,
    InCellTabDirective,
    LayoutComponent,
    HeaderComponent,
    SearchComponent,
    FormControllerComponent,
    LocationComponent,
    CurrencyComponent,
    ProfileComponent,
    ProfileDetailsWindow,
    PersonComponent,
    LoginComponent,

    SingleGridWindow,
    MasterDetailWindow,
    MasterWindow
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GridModule,
    PDFModule,
    ExcelModule,
    LabelModule,
    LayoutModule,
    ButtonsModule,
    EditorModule,
    FileSelectModule,
    ChartsModule,
    IntlModule,
    DateInputsModule,
    InputsModule,
    DropDownsModule,
    NotificationModule,
    DialogsModule,
    PagerModule,
    NavigationModule,
    TooltipsModule,
    IndicatorsModule
  ],
  providers: [
    { provide: MessageService, useClass: CustomMessagesService },
    { provide: LOCALE_ID, useValue: 'en-US' },
    EditGridService,
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
