import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { fields, WindowConfiguration } from "src/app/framework/interface/window.configuration";
import { CurrencyComponent } from "./currency.component";

//#region " FIELD DECLARATION "

const employeeDetailFields : fields[] = [
  {
    field: "employeeId",
    title: "Employee",
    format: "",
    width: 150,
    required: true,
    type: "text", controltype: "text",
    hidden: true,
    filterable: false
  },
  {
    field: "lastName",
    title: "Last Name",
    format: "",
    width: 150,
    required: true,
    type: "text", controltype: "text",
    hidden: false,
    filterable: true
  },
  {
    field: "firstName",
    title: "First Name",
    format: "",
    width: 150,
    required: false,
    type: "text", controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "title",
    title: "Title",
    format: "",
    width: 150,
    required: false,
    type: "text", controltype: "text",
    hidden: false,
    filterable: false,
    combobox: {
      key: "title",
      valueField: "title",
      textField: "title",
      defaultX: {title: 'Sales Representative'},
      api: "",
      bind: [],
      data: []
    }
  },
  {
    field: "titleOfCourtesy",
    title: "Courtesy",
    format: "",
    width: 100,
    required: false,
    type: "text", controltype: "text",
    hidden: true,
    filterable: false
  },
  {
    field: "city",
    title: "City",
    format: "",
    width: 100,
    required: false,
    type: "text", controltype: "text",
    hidden: true,
    filterable: false
  }
];

//#endregion

export class CurrencyConfig {
  CurrencyConfig : WindowConfiguration = {
    search: {
      title: "",
      columns: [],
      key: "",
      width: 800,
      height: 500,
      api: '',
    },
    window: {
      window: CurrencyComponent,
      title: "Currency",
      width: 600,
      height: 700,
      resizable: false,
      recordSelected: [],
      records: [],
      loading: {
        setLoading: this.setLoading,
        resetLoading: this.resetLoading,
        checkLoading: this.checkLoading,
        isLoading: true
      }
    },
    components: {
      search: undefined,
      window: undefined,
      navigator: undefined,
      menubar: undefined
    },
    master: {
      api: 'https://demodata.grapecity.com/northwind/api/v1/Employees/x',
      param: '',
      key: "",
      form: new FormGroup({}),
      model: [],
      data: [],
      loading: false,
      new: null
    },
    details: [
      {
        height: 541,
        api: 'https://demodata.grapecity.com/northwind/api/v1/Employees/x/Subordinates',
        param: '2',
        columns: employeeDetailFields,
        key: "employeeId",
        form: this.grid1(),
        createForm: this.grid1,
        model: employeeDetailFields,
        data: [],
        bind: [],
        formBind: FormGroup,
        grid: undefined,
        filter: '',
        selected: [],
        buttons: {
          add: false,
          remove: false,
          hideAdd: false,
          hideRemove: false
        },
        loading: false,
        config: {
          isNew: false
        }
      }
    ],
    configuration: {
      type: "singlegrid",
      fromExistingWindow: false,
      isMobile: undefined,
      skipValidation: false
    }
  }

  constructor() {
  }

  //#region " CUSTOM "

  grid1(data: any = null): FormGroup {
    var _form = new FormGroup({});
    employeeDetailFields.forEach((field: fields)=> {
      if(field.required == true) {
        _form.addControl(field.field, new FormControl(data ? data[field.field] : '', [Validators.required]));
      }
      else {
        _form.addControl(field.field, new FormControl(data ? data[field.field] : ''));
      }
    });

    _form.addControl('_rowstate', new FormControl(data ? data['_rowstate'] : 'new'));
    return _form;
  }

  //#endregion

  //#region " CORE FUNCtiONS "

  checkLoading(CurrencyConfig: WindowConfiguration, gridNumber: number) {
    var me = this;
    if(CurrencyConfig.details[0].loading == false) {
      CurrencyConfig.window.loading.isLoading = false;
      CurrencyConfig.configuration.skipValidation = false;
    }
  }

  resetLoading(CurrencyConfig: WindowConfiguration) {
    var me = this;
    CurrencyConfig.window.loading.isLoading = false;
    CurrencyConfig.details[0].loading = false;
  }

  setLoading(CurrencyConfig: WindowConfiguration, status: boolean) {
    var me = this;
    CurrencyConfig.window.loading.isLoading = status;
    CurrencyConfig.details[0].loading = status;
  }

  //#endregion

}
