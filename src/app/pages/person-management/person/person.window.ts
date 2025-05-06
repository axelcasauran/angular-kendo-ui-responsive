import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PersonComponent } from "./person.component";
import { fields, WindowConfiguration } from "../../../framework/interface/window.configuration";
import { country } from "../../../resources/country";
import { FunctionService } from '../../../services/functions.service';
import { CurrencyConfig } from "../../currency/currency.window";
import { ProfileConfig } from "../../profile-details/profile-details.config.window";


//#region " FIELD DECLARATION "

const searchFields : fields[] = [
  {
    field: "firstName",
    title: "First Name",
    format: "",
    width: 120,
    filterable: true,
    type: "text",
    controltype: "text",
    hidden: false,
    required: false
  },
  {
    field: "lastName",
    title: "Last Name",
    format: "",
    width: 180,
    filterable: true,
    type: "text",
    controltype: "text",
    hidden: true,
    required: false
  },
  {
    field: "title",
    title: "Title",
    format: "",
    width: 220,
    filterable: true,
    type: "text",
    controltype: "text",
    hidden: true,
    required: false
  },
  {
    field: "country",
    title: "Country",
    format: "",
    width: 100,
    filterable: true,
    type: "text",
    controltype: "text",
    hidden: true,
    required: false
  }
];

const masterFields : fields[] = [
  {
    field: "intPersonId",
    title: "Person Id",
    format: "",
    width: 100,
    required: false,
    type: "text",
    controltype: "text",
    hidden: true,
    filterable: false
  },
  {
    field: "strLastName",
    title: "Last Name",
    format: "",
    width: 100,
    required: true,
    type: "text",
    controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "strFirstName",
    title: "First Name",
    format: "",
    width: 100,
    required: true,
    type: "text",
    controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "strMiddleName",
    title: "Middle Name",
    format: "",
    width: 100,
    required: true,
    type: "text",
    controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "strGender",
    title: "Gender",
    format: "",
    width: 100,
    required: false,
    type: "text",
    controltype: "combobox",
    hidden: false,
    filterable: false,
    comboboxData: [
      "Male",
      "Female"
    ],
    comboboxLabelDrillDownFn: []
  },
  {
    field: "dtmBirthDate",
    title: "Birthday",
    format: "",
    width: 100,
    required: false,
    type: "date",
    controltype: "datepicker",
    hidden: false,
    filterable: false
  },
  {
    field: "strMaritalStatus",
    title: "Marital Status",
    format: "",
    width: 100,
    required: false,
    type: "text",
    controltype: "combobox",
    hidden: false,
    filterable: false,
    comboboxData: [
      "Single",
      "Married",
      "Widowed",
      "Divorced"
    ],
    comboboxLabelDrillDownFn: function() {
      var me = this;
      console.log('test click');
    }
  },
  {
    field: "strNationality",
    title: "Country",
    format: "",
    width: 100,
    required: false,
    type: "text",
    controltype: "combobox",
    hidden: false,
    filterable: false,
    comboboxData: country
  },
  {
    field: "strOccupation",
    title: "Occupation",
    format: "",
    width: 100,
    required: false,
    type: "text",
    controltype: "text",
    hidden: false,
    filterable: false
  }
];

const employeeDetailFields : fields[] = [
  {
    field: "employeeId",
    title: "Employee",
    format: "",
    width: 150,
    required: true,
    type: "text",
    controltype: "text",
    hidden: true,
    filterable: false
  },
  {
    field: "lastName",
    title: "Last Name",
    format: "",
    width: 150,
    required: true,
    type: "text",
    controltype: "text",
    hidden: false,
    filterable: true
  },
  {
    field: "firstName",
    title: "First Name",
    format: "",
    width: 150,
    required: false,
    type: "text",
    controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "title",
    title: "Title",
    format: "",
    width: 150,
    required: false,
    type: "text",
    controltype: "text",
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
    type: "text",
    controltype: "text",
    hidden: true,
    filterable: false
  },
  {
    field: "city",
    title: "City",
    format: "",
    width: 100,
    required: false,
    type: "text",
    controltype: "text",
    hidden: true,
    filterable: false
  }
];

const orderDetailFields : fields[] = [
  {
    field: 'customerId',
    title: "Customer Id",
    type: 'text',
    controltype: "text",
    format: "",
    width: 150,
    required: true,
    hidden: false,
    filterable: false,
    editable: true,
    combobox: {
      key: "customerId",
      valueField: "customerId",
      textField: "companyName",
      api: "https://demodata.grapecity.com/northwind/api/v1/Customers",
      bind: [],
      data: [],
      fnDisplayText: undefined
    }
  },
  {
    field: 'shipName',
    title: "Ship Name",
    type: 'text',
    controltype: "text",
    format: "",
    width: 150,
    required: true,
    hidden: false,
    filterable: false
  },
  {
    field: 'shipAddress',
    title: "Ship Address",
    type: 'text',
    controltype: "text",
    format: "",
    width: 150,
    required: true,
    hidden: false,
    filterable: false
  }
];

//#endregion


export class PersonConfig extends FunctionService {
  PersonConfig : WindowConfiguration = {
    search: {
      title: "Search Person",
      columns: searchFields,
      key: "employeeId",
      width: 800,
      height: 500,
      api: 'https://demodata.grapecity.com/northwind/api/v1/Employees',
    },
    window: {
      window: PersonComponent,
      title: "Person Details",
      width: 1050,
      height: 700,
      resizable: true,
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
      key: "intPersonId",
      form: this.masterForm(),
      model: masterFields,
      data: [],
      loading: false,
      new: this.masterForm
    },
    details: [
      {
        height: 410,
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
      },
      {
        height: 500,
        api: 'https://demodata.grapecity.com/northwind/api/v1/Employees/x/Orders',
        param: '1',
        columns: orderDetailFields,
        key: "customerId",
        form: this.grid2(),
        createForm: this.grid2,
        model: orderDetailFields,
        data: [],
        bind: [],
        formBind: FormGroup,
        grid: undefined,
        filter: '',
        selected: [],
        buttons: {
          add: false,
          remove: false,
          hideAdd: true,
          hideRemove: true
        },
        loading: false,
        config: {
          isNew: false
        }
      }
    ],
    configuration: {
      type: "master-detail",
      fromExistingWindow: false,
      isMobile: undefined,
      skipValidation: false
    }
  }

  constructor() {
    super();
    this.PersonConfig.details[1].columns[0].combobox.fnDisplayText = this.getCustomer;
    this.PersonConfig.master.model[4].comboboxLabelDrillDownFn = this.genderLabelDrilldown;
  }

  //#region " CUSTOM "

  masterForm(data: any = null): FormGroup {
    var _form = new FormGroup({});
    masterFields.forEach((field: fields)=> {
      if(field.hidden == false) {
        if(field.required == true) {
          _form.addControl(field.field, new FormControl(data ? data[field.field] : '', [Validators.required]));
        }
        else {
          _form.addControl(field.field, new FormControl(data ? data[field.field] : ''));
        }
      }
    });

    _form.addControl('_rowstate', new FormControl(data ? data['_rowstate'] : 'new'));
    return _form;
  }

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

  grid2(data: any = null): FormGroup {
    var _form = new FormGroup({});
    orderDetailFields.forEach((field: fields)=> {
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

  getCustomer(id: number, combo: any) {
    return combo.data.find((x: any) => x.customerId === id)?.companyName;
  }

  genderLabelDrilldown() {
    var me = this;
    console.log(me['window']['windowconfig']);
    var _screen = new ProfileConfig().ProfileConfig;
    _screen.master.param = '2';
    me['window']['common'].openWindow(_screen);
  }

  //#endregion


}
