import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../config.service';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormFlowService {


  private fb = inject(FormBuilder);
  private config = inject(ConfigService);
  private http = inject(HttpClient);

  createFormGroup(controls: any[]): FormGroup {
    const fgrp = this.fb.group({});
    this.appendToFormGroup(fgrp, controls);
    return fgrp;
  }


  appendToFormGroup(fgrp: FormGroup<any>, controls: any[]) {
    controls.forEach(ctl => {
      if (ctl.type === 'space' || ctl.type === 'divider') {
        ctl.isNonMatFormField = true;
      }
      else {
        const fc = new FormControl(ctl.value);
        if (ctl.isRequired) {
          fc.addValidators(Validators.required);
        }
        if (ctl.minLength) {
          fc.addValidators(Validators.minLength(ctl.minLength));
        }
        if (ctl.maxLength) {
          fc.addValidators(Validators.maxLength(ctl.maxLength));
        }
        if (ctl.min) {
          fc.addValidators(Validators.min(ctl.min));
        }
        if (ctl.max) {
          fc.addValidators(Validators.max(ctl.max));
        }


        fgrp.addControl(ctl.name, fc);
      }

    });

    /*
    
        {
            "type": "text",
            "label": "Company",
            "name": "company",
            "flex": 'full',
            "value": "",
            "isRequired": true,
        },
    */

  }

  constructor() { }

  setControlData(formGroup: FormGroup, data: any, ctls: any[]) {
    const noDataCtls = new Set(['space', 'divider']);

    ctls.forEach(ctl => {
      if (!noDataCtls.has(ctl.type)) {

        let ctlValue = ctl.value; 
        if (data && data[ctl.name]) {
          ctlValue = data[ctl.name];
        }
        if( ctl.type === 'chips' ){
          ctl.values = ctlValue;
        }
        formGroup.controls[ctl.name].setValue(ctlValue);
      }
    });
  }

  async loadFormDef(formId: string) {

    const assetsFormDir = this.config.assetsFormDir;
    const fn = `./assets/${assetsFormDir}/${formId}.json`;
    const controls = <any[]>await lastValueFrom(this.http.get(fn));
    return controls;
  }

  async saveToFile(formId: string, controls: any[]) {
    const endpoint = this.config.formWriteServiceEndpoint;
    const apiFullFormPath = this.config.apiFullFormPath;
    const response = await lastValueFrom(this.http.put(`${endpoint}/save-json/${formId}`, { apiFullFormPath: apiFullFormPath, data: controls }));
    console.log(`put ${formId}`, response);

  }

  getApiValues(api: string, filterValue: string): Observable<any> {
    if (!filterValue)
      filterValue = '-';
    const endpoint = this.config.formWriteServiceEndpoint;
    filterValue = encodeURIComponent(filterValue);
    const url = `${endpoint}/${api}/${filterValue}`;
    return this.http.get(url);

  }


}
