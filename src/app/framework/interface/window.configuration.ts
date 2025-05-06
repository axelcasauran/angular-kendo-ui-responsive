import { FormGroup } from "@angular/forms";

export interface fields {
  field: string,
  title: string,
  width: number,
  required: boolean,
  type: "text" | "numeric" | "boolean" | "date",
  controltype: "text" | "number" | "checkbox" | "datepicker" | "combobox" | "multicombobox",
  format: string,
  hidden: boolean,
  filterable: boolean,
  editable?: boolean,
  combobox?: any,
  comboboxData?: Array<string>,
  comboboxLabelDrillDownFn?: any
};

interface grids {
  height: number,
  api: string,
  param: string,
  columns: any,
  key: string,
  form: FormGroup,
  createForm: any,
  model: fields[],
  data: any,
  bind: any,
  formBind: any,
  grid: any,
  filter: string,
  selected: number[],
  buttons: {
            add: boolean,
            remove: boolean,
            hideAdd: boolean,
            hideRemove: boolean
          },
  loading: boolean,
  config: {
    isNew: boolean
  }
};

export interface WindowConfiguration {
  search: {
    title: string;
    columns: fields[];
    key: string;
    api: string;
    width: number;
    height: number;
  },
  window: {
    window: any;
    title: string;
    width: number;
    height: number;
    resizable: boolean;
    recordSelected: any;
    records: any;
    loading: {
      setLoading: any,
      resetLoading: any,
      checkLoading: any,
      isLoading: boolean
    }
  },
  components: {
    window: any;
    search: any;
    navigator: any;
    menubar: any;
  },

  master: {
    api: string;
    param: string;
    form: FormGroup;
    model: fields[];
    key: string;
    data: any;
    loading: boolean,
    new: any
  },
  details: grids[],

  configuration: {
    type: "master-detail" | "master" | "singlegrid",
    fromExistingWindow: boolean;
    isMobile?: boolean;
    skipValidation: boolean
  },
  common?: any
}
