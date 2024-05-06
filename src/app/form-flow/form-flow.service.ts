import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../config.service';
import { lastValueFrom } from 'rxjs';
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
      if (ctl.type === 'space') {
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

  setControlData(formGroup: FormGroup, ctls: any[], data: any) {
    console.log('ffs', formGroup);

    ctls.forEach(ctl => {
      if (ctl.type !== 'space') {
        let cval = ctl.value;
        if (data && data[ctl.name]) {
          cval = data[ctl.name];
        }
        console.log('ffsc', ctl.name, cval);

        formGroup.controls[ctl.name].setValue(cval);
      }
    });
  }

  async loadFormDef(formId: string) {
    console.log('loadFormDef', formId);
    
    const formPath = this.config.formPath;
    const assetIdx = formPath.indexOf('/assets/');
    const fn = formPath.substring(assetIdx) + '/' + formId + '.json';

    const controls = <any[]>await lastValueFrom(this.http.get(fn));
    console.log('loadFormDef', fn, controls);
    // const formPath = `${this.config.formPath}/${this.formId}.json`;
    return controls;
  }

  async saveToFile(formId: string, controls: any[]) {
    const endpoint = this.config.formWriteServiceEndpoint;
    const formPath = this.config.formPath;
    console.log('save', endpoint, formPath);

    const response = await lastValueFrom(this.http.put(`${endpoint}/save-json/${formId}`, { formPath: formPath, data: controls }));
    console.log(`put ${formId}`, response);

  }



}
