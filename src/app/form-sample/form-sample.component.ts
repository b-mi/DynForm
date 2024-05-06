import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule, NgModel } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FormFlowService } from '../form-flow/form-flow.service';
import { JsonPipe } from '@angular/common';
import { FormFlowContentComponent } from '../form-flow/form-flow-content.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-sample',
  templateUrl: './form-sample.component.html',
  styleUrl: './form-sample.component.css',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    JsonPipe,
    FormFlowContentComponent,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule
  ]
})
export class FormSampleComponent implements OnInit {

  private http = inject(HttpClient);
  private fservice = inject(FormFlowService);
  formGroup!: FormGroup;
  public editMode: boolean = false;
  editedControl: any;

  constructor() {
  }
  ngOnInit() {
    this.loadForms();
  }


  async loadForms() {
    this.ctlsShipping = await this.fservice.loadFormDef('shipingInf');
    this.ctlsCarInf = await this.fservice.loadFormDef('carInfo');

    const fg = this.fservice.createFormGroup(this.ctlsShipping);
    this.fservice.appendToFormGroup(fg, this.ctlsCarInf);
    this.formGroup = fg;
  }

  ctlsShipping: any[] = [];
  ctlsCarInf: any[] = [];

  // controls1 = [
  //   {
  //     "type": "text",
  //     "label": "Company",
  //     "name": "company",
  //     "flex": 'full',
  //     "value": "",
  //     "isRequired": true,
  //     minLength: 10,
  //     maxLength: 20,
  //     hintStart: 'Description at start',
  //     hintEnd: 'Description at end'

  //   },
  //   {
  //     "type": "text",
  //     "label": "First name",
  //     "name": "firstName",
  //     "flex": 'half',
  //     "value": "",
  //     "isRequired": true,
  //     hintEnd: 'Description at end'
  //   },
  //   {
  //     "type": "text",
  //     "label": "Last name",
  //     "name": "lastName",
  //     "flex": 'half',
  //     "value": "",
  //   },
  //   {
  //     "type": "textarea",
  //     "label": "Address",
  //     "name": "address",
  //     "flex": 'full',
  //     "value": "",
  //     isRequired: true
  //   },
  //   {
  //     "type": "text",
  //     "label": "City",
  //     "name": "city",
  //     "flex": 'half',
  //     "value": "",
  //   },
  //   {
  //     "type": "select",
  //     "label": "State",
  //     "name": "state",
  //     "flex": 'half',
  //     "values": [
  //       { label: 'Alabama', key: 'AL' },
  //       { label: 'Alaska', key: 'AK' },
  //       { label: 'American Samoa', key: 'AS' },
  //       { label: 'Arizona', key: 'AZ' },
  //       { label: 'Arkansas', key: 'AR' },
  //       { label: 'California', key: 'CA' },
  //       { label: 'Colorado', key: 'CO' },
  //     ],
  //   },
  //   {
  //     "type": "number",
  //     "label": "Postal Code",
  //     "name": "postal_code",
  //     "flex": 'half',
  //     "value": undefined,
  //     isRequired: true,
  //     min: 10000,
  //     max: 99999
  //   },
  //   {
  //     "type": "select",
  //     "label": "Shipping",
  //     "name": "shipping",
  //     "flex": 'half',
  //     "values": [
  //       { label: 'Free Shipping', key: 'FS' },
  //       { label: 'Priority Shipping', key: 'PS' },
  //       { label: 'Next Day Shipping', key: 'ND' },
  //     ],
  //   },
  // ];

  // controls2 = [

  //   {
  //     "type": "text",
  //     "label": "Car",
  //     "name": "car_name",
  //     "flex": 'quarter',
  //     "value": "",
  //   },
  //   {
  //     "type": "date",
  //     "label": "Date 1",
  //     "name": "car_date1",
  //     "flex": 'quarter',
  //     "value": null,
  //   },
  //   {
  //     "type": "date",
  //     "label": "Date 2",
  //     "name": "car_date2",
  //     "flex": 'quarter',
  //     "value": null,
  //   },
  //   {
  //     "type": "checkbox",
  //     "label": "Check",
  //     "name": "check1",
  //     "flex": 'quarter',
  //     isRequired: true,
  //     "value": null,
  //   },

  //   {
  //     "type": "text",
  //     "label": "Car 2",
  //     "name": "car_name2",
  //     "flex": 'quarter',
  //     "value": "",
  //   },
  //   {
  //     "type": "space",
  //     "flex": 'quarter'
  //   },
  //   {
  //     "type": "number",
  //     "label": "Age 2",
  //     "name": "car_age2",
  //     "flex": 'quarter',
  //     "value": 0,
  //   },
  //   {
  //     "type": "checkbox",
  //     "label": "Check 2",
  //     "name": "check2",
  //     "flex": 'quarter',
  //     isRequired: true,
  //     "value": null,
  //   },
  //   {
  //     "type": "radio",
  //     "label": "Sex",
  //     "name": "sex",
  //     "flex": 'half',
  //     isRequired: true,
  //     "values": [
  //       { label: 'Man', key: 'M' },
  //       { label: 'Woman', key: 'W' }
  //     ],
  //   },

  // ]

  onSubmit(): void {
    //alert('Thanks!');
  }

  enable(ena: boolean) {

    const arr = [...this.ctlsShipping, ...this.ctlsCarInf];

    arr.forEach(fld => {
      const ctl = this.formGroup.get(<string>fld.name);
      if (ena)
        ctl?.enable();
      else
        ctl?.disable();
    });
  }




}
