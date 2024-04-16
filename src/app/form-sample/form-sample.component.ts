import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormFlowService } from '../form-flow/form-flow.service';
import { MatDividerModule } from '@angular/material/divider';
import { NgClass, JsonPipe } from '@angular/common';
import { FormFlowContentComponent } from '../form-flow/form-flow-content.component';


@Component({
  selector: 'app-form-sample',
  templateUrl: './form-sample.component.html',
  styleUrl: './form-sample.component.css',
  standalone: true,
  imports: [
    NgClass,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
    JsonPipe,
    FormFlowContentComponent
  ]
})
export class FormSampleComponent {
  private fservice = inject(FormFlowService);


  controls1 = [
    {
      "type": "text",
      "label": "Company",
      "name": "company",
      "flex": 'full',
      "value": "",
      "isRequired": true,
      minLength: 10,
      maxLength: 20,
      hintStart: 'Description at start',
      hintEnd: 'Description at end'

    },
    {
      "type": "text",
      "label": "First name",
      "name": "firstName",
      "flex": 'half',
      "value": "",
      "isRequired": true,
      hintEnd: 'Description at end'
    },
    {
      "type": "text",
      "label": "Last name",
      "name": "lastName",
      "flex": 'half',
      "value": "",
    },
    {
      "type": "textarea",
      "label": "Address",
      "name": "address",
      "flex": 'full',
      "value": "",
      isRequired: true
    },
    {
      "type": "text",
      "label": "City",
      "name": "city",
      "flex": 'half',
      "value": "",
    },
    {
      "type": "select",
      "label": "State",
      "name": "state",
      "flex": 'half',
      "values": [
        { label: 'Alabama', key: 'AL' },
        { label: 'Alaska', key: 'AK' },
        { label: 'American Samoa', key: 'AS' },
        { label: 'Arizona', key: 'AZ' },
        { label: 'Arkansas', key: 'AR' },
        { label: 'California', key: 'CA' },
        { label: 'Colorado', key: 'CO' },
      ],
    },
    {
      "type": "number",
      "label": "Postal Code",
      "name": "postal_code",
      "flex": 'half',
      "value": undefined,
      isRequired: true,
      min: 10000,
      max: 99999
    },
    {
      "type": "select",
      "label": "Shipping",
      "name": "shipping",
      "flex": 'half',
      "values": [
        { label: 'Free Shipping', key: 'FS' },
        { label: 'Priority Shipping', key: 'PS' },
        { label: 'Next Day Shipping', key: 'ND' },
      ],
    },
  ];

  controls2 = [

    {
      "type": "text",
      "label": "Car",
      "name": "car_name",
      "flex": 'quarter',
      "value": "",
    },
    {
      "type": "number",
      "label": "Price",
      "name": "car_price",
      "flex": 'quarter',
      "value": 0,
    },
    {
      "type": "number",
      "label": "Age",
      "name": "car_age",
      "flex": 'quarter',
      "value": 0,
    },
    {
      "type": "checkbox",
      "label": "Check",
      "name": "check1",
      "flex": 'quarter',
      isRequired: true,
      "value": null,
    },    

    {
      "type": "text",
      "label": "Car 2",
      "name": "car_name2",
      "flex": 'quarter',
      "value": "",
    },
    {
      "type": "space",
      "flex": 'quarter'
    },
    {
      "type": "number",
      "label": "Age 2",
      "name": "car_age2",
      "flex": 'quarter',
      "value": 0,
    },
    {
      "type": "checkbox",
      "label": "Check 2",
      "name": "check2",
      "flex": 'quarter',
      isRequired: true,
      "value": null,
    },    


  ]

  formGroup: FormGroup;

  constructor() {
    this.formGroup = this.fservice.createFormGroup(this.controls1);
    this.fservice.appendToFormGroup(this.formGroup, this.controls2);
    //console.log(this.formDef.getFormStructure());

  }

  onSubmit(): void {
    alert('Thanks!');
  }
}
