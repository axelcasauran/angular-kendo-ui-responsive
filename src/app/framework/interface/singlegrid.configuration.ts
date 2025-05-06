import { FormGroup } from "@angular/forms";

export interface fields {
  field: string,
  title: string,  
  width: number,
  required: boolean,
  type: "text" | "numeric" | "boolean" | "date",
  format: string,
  hidden: boolean,
  filterable: boolean,
  editable?: boolean,
  combobox?: any
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

export interface SingleGridConfiguration {
  window: {
    window: any;
    title: string;
    width: number;  
    height: number;
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
  };

  master: {
    grid: grids
  }
  
  configuration: {
    fromExistingWindow: boolean;
    isMobile?: boolean;
    skipValidation: boolean
  }  
}