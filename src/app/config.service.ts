import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {


  formWriteServiceEndpoint!: string;
  apiFullFormPath!: string;
  assetsFormDir!: string;

  constructor() {
  }

  setValues(cf: any) {
    this.formWriteServiceEndpoint = cf.formWriteServiceEndpoint;
    this.apiFullFormPath = cf.apiFullFormPath;
    this.assetsFormDir = cf.assetsFormDir;

  }


}
