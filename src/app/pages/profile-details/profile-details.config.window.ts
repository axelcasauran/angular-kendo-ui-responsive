import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProfileDetailsWindow } from "./profile-details.window";
import { fields, WindowConfiguration } from "../../framework/interface/window.configuration";
import { title } from "src/app/framework/models/categories.model";

//#region " FIELD DECLARATION "

const searchFields : fields[] = [
  {
    field: "firstName",
    title: "First Name",
    format: "",
    width: 150,
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
    width: 150,
    filterable: true,
    type: "text",
    controltype: "text",
    hidden: false,
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
    field: "employeeId",
    title: "Employee",
    format: "",
    width: 100,
    required: true,
    type: "text",
    controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "lastName",
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
    field: "firstName",
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
    field: "title",
    title: "Title",
    format: "",
    width: 100,
    required: false,
    type: "text",
    controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "titleOfCourtesy",
    title: "Courtesy",
    format: "",
    width: 100,
    required: false,
    type: "text",
    controltype: "text",
    hidden: false,
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
    type: "text", controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "title",
    title: "Title",
    format: "",
    width: 300,
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
      bind: title,
      data: title
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

const orderDetailFields : fields[] = [
  {
    field: 'customerId',
    title: "Customer Id",
     type: "text", controltype: "text",
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
     type: "text", controltype: "text",
    format: "",
    width: 150,
    required: true,
    hidden: false,
    filterable: false
  },
  {
    field: 'shipAddress',
    title: "Ship Address",
     type: "text", controltype: "text",
    format: "",
    width: 150,
    required: true,
    hidden: false,
    filterable: false
  }
];

//#endregion


export class ProfileConfig {
  ProfileConfig : WindowConfiguration = {
    search: {
      title: "Search Profile",
      columns: searchFields,
      key: "employeeId",
      width: 800,
      height: 500,
      api: 'https://demodata.grapecity.com/northwind/api/v1/Employees',
    },
    window: {
      window: ProfileDetailsWindow,
      title: "Profile",
      width: 720,
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
      key: "employeeId",
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
    this.ProfileConfig.details[1].columns[0].combobox.fnDisplayText = this.getCustomer;
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

  //#endregion

  //#region " CORE FUNCtiONS "

  checkLoading(ProfileConfig: WindowConfiguration, gridNumber: number) {
    var me = this;
    console.log('checkLoading', ProfileConfig);
    console.log(ProfileConfig.master.loading);
    if(ProfileConfig.master.loading == false && ProfileConfig.details[gridNumber].loading == false) {
      ProfileConfig.window.loading.isLoading = false;
      ProfileConfig.configuration.skipValidation = false;
      // console.log(ProfileConfig.details[gridNumber].loading);
      // if(ProfileConfig.details[gridNumber].loading == false) {
      //   ProfileConfig.window.loading.isLoading = false;
      //   ProfileConfig.configuration.skipValidation = false;
      // }
    }
  }

  resetLoading(ProfileConfig: WindowConfiguration) {
    var me = this;
    ProfileConfig.window.loading.isLoading = false;
    ProfileConfig.master.loading = false;
    ProfileConfig.details.forEach((x: any)=> {
      x.loading = false;
    });
  }

  setLoading(ProfileConfig: WindowConfiguration, status: boolean) {
    var me = this;
    ProfileConfig.window.loading.isLoading = status;
    ProfileConfig.master.loading = status;
    ProfileConfig.details.forEach((x: any)=> {
      x.loading = status;
    });
  }

  //#endregion

}
