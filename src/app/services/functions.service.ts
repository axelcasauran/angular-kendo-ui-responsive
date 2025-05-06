import { Injectable } from "@angular/core";
import { fields, WindowConfiguration } from "../framework/interface/window.configuration";

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor() { }

  checkLoading(config: WindowConfiguration, gridNumber: number) {
    var me = this;
    if(config.master.loading == false && config.configuration.type == 'master-detail') {
      if(config.details[gridNumber].loading == false) {
        config.window.loading.isLoading = false;
        config.configuration.skipValidation = false;
      }
    }
    else if(config.master.loading == false && config.configuration.type == 'master') {
      config.window.loading.isLoading = false;
      config.configuration.skipValidation = false;
    }
    else if(config.details.length > 0) {
      if(config.master.loading == false && config.details[gridNumber].loading == false) {
        config.window.loading.isLoading = false;
        config.configuration.skipValidation = false;
      }
    }
  }

  resetLoading(config: WindowConfiguration) {
    var me = this;
    config.window.loading.isLoading = false;
    config.master.loading = false;
    config.details.forEach((x: any)=> {
      x.loading = false;
    });
  }

  setLoading(config: WindowConfiguration, status: boolean) {
    var me = this;
    config.window.loading.isLoading = status;
    config.master.loading = status;
    config.details.forEach((x: any)=> {
      x.loading = status;
    });
  }

}
