import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { LocationComponent } from "./location.component";
import { fields, WindowConfiguration } from "../../framework/interface/window.configuration";
import { FunctionService } from '../../services/functions.service';


//#region " FIELD DECLARATION "

const searchFields : fields[] = [
  {
    field: "firstName",
    title: "First Name",
    format: "",
    width: 120,
    filterable: true,
     type: "text", controltype: "text",
    hidden: false,
    required: false
  },
  {
    field: "lastName",
    title: "Last Name",
    format: "",
    width: 180,
    filterable: true,
     type: "text", controltype: "text",
    hidden: true,
    required: false
  },
  {
    field: "title",
    title: "Title",
    format: "",
    width: 220,
    filterable: true,
     type: "text", controltype: "text",
    hidden: true,
    required: false
  },
  {
    field: "country",
    title: "Country",
    format: "",
    width: 100,
    filterable: true,
     type: "text", controltype: "text",
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
     type: "text", controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "lastName",
    title: "Last Name",
    format: "",
    width: 100,
    required: true,
     type: "text", controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "firstName",
    title: "First Name",
    format: "",
    width: 100,
    required: true,
     type: "text", controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "title",
    title: "Title",
    format: "",
    width: 100,
    required: false,
     type: "text", controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "titleOfCourtesy",
    title: "Courtesy",
    format: "",
    width: 100,
    required: false,
     type: "text", controltype: "text",
    hidden: false,
    filterable: false
  },
  {
    field: "city",
    title: "City",
    format: "",
    width: 100,
    required: false,
     type: "text", controltype: "text",
    hidden: false,
    filterable: false
  }
];

//#endregion


export class LocationConfig extends FunctionService {
    LocationConfig : WindowConfiguration = {
    search: {
      title: "Search Location",
      columns: searchFields,
      key: "employeeId",
      width: 800,
      height: 500,
      api: 'https://demodata.grapecity.com/northwind/api/v1/Employees',
    },
    window: {
      window: LocationComponent,
      title: "Location",
      width: 380,
      height: 600,
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
      key: "employeeId",
      form: this.masterForm(),
      model: masterFields,
      data: [],
      loading: false,
      new: this.masterForm
    },
    details: [
    ],
    configuration: {
      type: "master",
      fromExistingWindow: false,
      isMobile: undefined,
      skipValidation: false
    }
  }

  constructor() {
    super();
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


  getCustomer(id: number, combo: any) {
    return combo.data.find((x: any) => x.customerId === id)?.companyName;
  }

  //#endregion

}
