import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormFlowService {


  private fb = inject(FormBuilder);

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
}
