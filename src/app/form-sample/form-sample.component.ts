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
import { ConfigService } from '../config.service';
import { lastValueFrom } from 'rxjs';

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

  private config = inject(ConfigService);
  private http = inject(HttpClient);
  private fservice = inject(FormFlowService);
  formGroup!: FormGroup;

  // if edit mode is allower. Need web api for writing form definitions to file system
  // acoording to config.json apiFullFormPath
  allowEditMode = true;

  constructor() {
  }
  ngOnInit() {
    this.loadForms();
  }

  formIdShipping: string = 'shipingInf';
  formIdCarInfo: string = 'carInfo';

  async loadForms() {
    // load form definitions from json file in assets/ and configured assetsFormDir in config.json
    this.ctlsShipping = await this.fservice.loadFormDef(this.formIdShipping);
    this.ctlsCarInf = await this.fservice.loadFormDef(this.formIdCarInfo);

    // create empty fromGroup
    const fg = new FormGroup({});

    // fill formGroup
    this.fservice.appendToFormGroup(fg, this.ctlsShipping);
    this.fservice.appendToFormGroup(fg, this.ctlsCarInf);
    this.formGroup = fg;
  }

  ctlsShipping: any[] = [];
  ctlsCarInf: any[] = [];


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

  async loadData() {
    const endpoint = this.config.formWriteServiceEndpoint;
    const url = `${endpoint}/get-sample-data`;
    const data = await lastValueFrom(this.http.get(url));
    this.fservice.setControlData(this.formGroup, data, this.ctlsShipping);
    this.fservice.setControlData(this.formGroup, data, this.ctlsCarInf);
    
  }



}
