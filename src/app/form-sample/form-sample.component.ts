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
