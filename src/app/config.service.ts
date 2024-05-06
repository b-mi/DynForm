import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {


  formWriteServiceEndpoint!: string;
  formPath!: string;

  constructor() {
  }

  setValues(cf: any) {
    this.formWriteServiceEndpoint = cf.formWriteServiceEndpoint;
    this.formPath = cf.formPath;
  }


}
